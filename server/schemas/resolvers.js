const { AuthenticationError } = require('apollo-server-express');
const { Drink, Orders, User, Payment } = require('../models');
const { signToken } = require('../utils/auth');
const { ApolloError } = require('apollo-server-express');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const imageBaseUrl = '/images/Drinks_pics';

const resolvers = {
    Query: {
        drinks: async () => {
            const drinks = await Drink.find({});
            const drinksWithAbsoluteImageUrls = drinks.map(drink => ({
                ...drink._doc,
                image: `${imageBaseUrl}/${drink.image}`
            }));
            return drinksWithAbsoluteImageUrls;
        },
        drink: async (parent, { drinkId }) => {
            const drink = await Drink.findOne({ _id: drinkId });
            if (drink) {
              return {
                ...drink._doc,
                image: `${imageBaseUrl}/${drink.image}`
              };
            } else {
              throw new Error('Drink not found');
            }
          },
        user: async (parent, { userId }, context) => {
            if(context.user && context.user._id === userId) {
                return context.user;
            }
            return await User.findOne({ _id: userId });
        },
        me: async (parent, args, context) => {
            if (context.user) {
               return User.findOne({ _id: context.user._id }).populate('orders');
            }
            throw new AuthenticationError('You need to be logged in!');
         },
        order: async (parent, { _id }) => {
            return await Orders.findOne({ _id }).populate('drinks.drink');
        },
        payments: async () => {
            return await Payment.find({}).populate('user');
        },
        payment: async (parent, { paymentId }) => {
            return await Payment.findById(paymentId).populate('user');
        }
    },
    Mutation: {
        addUser: async (parent, { name, email, password }) => {
            const user = await User.create({ name, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if(!user) {
                throw new AuthenticationError('Incorrect email');
            }
            const correctPw = await user.isCorrectPassword(password);
            if(!correctPw) {
                throw new AuthenticationError('Incorrect password');
            }
            const token = signToken(user);
            return { token, user };
        },
        addOrder: async (parent, { drinks }, context) => {
            if (!context.user) {
            throw new AuthenticationError('Not logged in');
            }

            const drinksWithPrice = await Promise.all(
            drinks.map(async (drink) => {
                const drinkDetails = await Drink.findById(drink.drinkId);
                return {
                drink: drink.drinkId,
                quantity: drink.quantity,
                size: drink.size,
                priceAtOrderTime: drinkDetails.prices[drink.size],
                };
            })
            );

            const cart = await Orders.findOneAndUpdate(
            { user: context.user._id },
            {
                $push: { drinks: { $each: drinksWithPrice } },
            },
            { upsert: true, new: true }
            ).populate('drinks.drink');

            return cart;
        },
        addDrinkToExistingOrder: async (parent, { orderId, drinkId, quantity, size }, context) => {
            if(!context.user) {
                throw new AuthenticationError('Not logged in');
            }

            const drinkDetails = await Drink.findById(drinkId);
            if (!drinkDetails) {
                throw new UserInputError('Invalid drink ID');
            }
            
            const newPrice = drinkDetails.prices[size];
            if(!newPrice) {
                throw new Error('Size not found for this drink');
            }

            const order = await Orders.findByIdAndUpdate(
                orderId, 
                { $push: 
                    { drinks: 
                        { drink: drinkId, quantity: quantity, size: size, priceAtOrderTime: newPrice } 
                    } 
                }, 
                { new: true, runValidators: true }).populate('drinks.drink');
            return order;
        }, 
        updateDrinkSizeInOrder: async (parent, { orderId, drinkId, newSize }, context) => {
            if (!context.user) {
                throw new AuthenticationError('Not logged in');
            }
        
            // Fetch the drink details, including the new price (based on the new size)
            const drinkDetails = await Drink.findById(drinkId);
            const newPrice = drinkDetails.prices[newSize];
            if (!newPrice) {
                throw new Error('Size not found for this drink');
            }
        
            // Update the order's drink size and priceAtOrderTime
            const order = await Orders.findOneAndUpdate(
                { _id: orderId, 'drinks.drink': drinkId },
                {
                    $set: {
                        'drinks.$.size': newSize,
                        'drinks.$.priceAtOrderTime': newPrice
                    }
                },
                { new: true, runValidators: true }).populate('drinks.drink');
            return order;
        },
        updateDrinkQuantityInOrder: async (parent, { orderId, drinkId, newQuantity }, context) => {
            if(!context.user) {
                throw new AuthenticationError('Not logged in');
            }
            const order = await Orders.findOneAndUpdate(
                { _id: orderId, 'drinks.drink': drinkId },
                {
                    $set: {
                        'drinks.$.quantity': newQuantity
                    }
                },
                { new: true, runValidators: true }).populate('drinks.drink');
            return order;
        },
        removeDrinkFromOrder: async (parent, { orderId, drinkId }, context) => {
            if(!context.user) {
                throw new AuthenticationError('Not logged in');
            }
            const order = await Orders.findByIdAndUpdate(
                { _id: orderId, 'drinks.drink': drinkId },
                { $pull: 
                    { drinks: 
                        { drink: drinkId } 
                    } 
                }, 
                { new: true, runValidators: true }).populate('drinks.drink');
            return order;
        },
        checkout: async (parent, { drinks }, context) => {
            const url = new URL(context.headers.referer).origin;

            if (!context.user) {
              throw new AuthenticationError('Not logged in');
            }
          
            // Fetch the order's drinks from the database
            const order = await Orders.findOne({ user: context.user._id }).populate('drinks.drink');
          
            // Construct line items for the Stripe session based on the drinks in the order
            const line_items = order.drinks.map(orderDrink => {
              return {
                price_data: {
                  currency: 'usd',
                  product_data: {
                    name: orderDrink.drink.name,
                  },
                  unit_amount: orderDrink.drink.prices[orderDrink.size] * 100, // Stripe expects the price in cents
                },
                quantity: orderDrink.quantity,
              };
            });
          
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items,
                mode: 'payment',
                success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${url}/`,
              });
          
            return { session: session.id };
          },
          processStripePayment: async (_, { paymentMethodId, amount }, context) => {
            if (!context.user) {
              throw new AuthenticationError('Not logged in');
            }
      
            try {
              // Convert amount to cents (Stripe uses cents)
              const amountInCents = Math.round(amount * 100);
      
              // Create a PaymentIntent to charge the user
              const payment = await stripe.paymentIntents.create({
                amount: amountInCents,
                currency: 'usd',
                payment_method: paymentMethodId,
                confirm: true, // This automatically confirms the payment
                automatic_payment_methods: {
                    enabled: true,
                    allow_redirects: 'never'
                }
              });
      
              if (payment.status === 'succeeded') {
                // Store the payment info in your database
                await Payment.create({
                    user: context.user._id,
                    paymentMethodId: paymentMethodId,
                    amount: amount,
                    status: 'succeeded'
                });
                
                return {
                    success: true,
                    message: 'Payment processed successfully!'
                };
              } else {
                return {
                  success: false,
                  message: 'Payment failed.'
                };
              }
      
            } catch (error) {
              throw new ApolloError(`Failed to process payment: ${error.message}`);
            }
        },
        logOrderToUserHistory: async (_, { userId, orderId }) => {
            const order = await Orders.findById(orderId); // Fetch the order

            // Check if drinks exist and set a default name if missing
            if (!order) {
                throw new Error('Order not found.');
            }
            if (order.drinks) {
                order.drinks.forEach(drink => {
                    if (!drink.name) drink.name = "Unknown Drink";
                });
            } else {
                throw new Error('No drinks found in the order.');
            }

            // Fetch the user and set the order
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User not found.');
            }
            user.orders.push(order);
            await user.save();

            return user;  // return the updated user
        }
    }
};

module.exports = resolvers;