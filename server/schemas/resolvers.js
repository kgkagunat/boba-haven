const { AuthenticationError } = require('apollo-server-express');
const { Drink, Size, Orders, User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        drinks: async () => {
            return await Drink.find({});
        },
        drink: async (parent, { drinkId }) => {
            return Drink.findOne({ _id: drinkId });
        },
        user: async (parent, args, context) => {
            if(context.user) {
                return context.user;
            }
            
            if(args.name) {
                return await User.findOne({ name: args.name });
            }

            throw new AuthenticationError('Not logged in');
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
                { new: true }
            );
        
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
                { new: true }
            );
            return order;
        },
        removeDrinkFromOrder: async (parent, { drinkId, orderId }, context) => {
            if(!context.user) {
                throw new AuthenticationError('Not logged in');
            }
            const order = await Orders.findByIdAndUpdate(
                orderId, 
                { $pull: 
                    { drinks: 
                        { drink: drinkId } 
                    } 
                }, 
                { new: true });
            return order;
        }
    }
};

module.exports = resolvers;