const { AuthenticationError } = require('apollo-server-express');
const { Drink, Orders, User } = require('../models');
const { signToken } = require('../utils/auth');

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
            if(!context.user) {
                throw new AuthenticationError('Not logged in');
            }
            
            // Calculate priceAtOrderTime for each drink in the order based on size -- ensure all async operations are complete before continuing
            const drinksWithPrice = await Promise.all (
                drinks.map(async drink => {
                const drinkDetails = await Drink.findById(drink.drinkId);
                return {
                    drink: drink.drinkId,
                    quantity: drink.quantity,
                    size: drink.size,
                    priceAtOrderTime: drinkDetails.prices[drink.size]
                    };
                })
            );

            // 1st) Create the order in the database
            const order = await Orders.create({ drinks: drinksWithPrice, user: context.user._id });

            // 2nd) Populate the order with the drink details
            const createdOrder = await Orders.findById(order._id).populate('drinks.drink');
            return createdOrder;
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
        }
    }
};

module.exports = resolvers;