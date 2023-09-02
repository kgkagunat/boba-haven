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
            
            // Calculate priceAtOrderTime for each drink in the order based on size
            const drinksWithPrice = drinks.map(async drink => {
                const drinkDetails = await Drink.findById(drink.drinkId);
                return {
                    drink: drink.drinkId,
                    quantity: drink.quantity,
                    size: drink.size,
                    priceAtOrderTime: drinkDetails.prices[drink.size]
                };
            });

            const drinksWithPricePromise = await Promise.all(drinksWithPrice);

            const order = await Orders.create({ drinks: drinksWithPricePromise, user: context.user._id });
            return order;
        },
        removeDrinkFromOrder: async (parent, { drinkId, orderId }, context) => {
            if(!context.user) {
                throw new AuthenticationError('Not logged in');
            }
            const order = await Orders.findByIdAndUpdate(
                orderId, 
                { $pull: { drinks: { drink: drinkId } } }, 
                { new: true });
            return order;
        }
    }
};

module.exports = resolvers;