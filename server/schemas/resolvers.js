const { AuthenticationError } = require('apollo-server-express');
const { Drink, Size, Orders, User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        
        drinks: async () => {
            return await Drink.find({}).populate('sizeOptions');
        },
        drink: async (parent, { drinkId }) => {
            return Drink.findOne({ _id: drinkId });
        },
        test: async () => {
            return await User.find({});
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
            return await Orders.findOne({ _id }).populate('drinks');
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
            const order = await Orders.create({ drinks });
        },
        removeDrinkFromOrder: async (parent, { drinkId }, context) => {
            if(!context.user) {
                throw new AuthenticationError('Not logged in');
            }
            const order = await Orders.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { drinks: drinkId } },
                { new: true }
            );
            return order;
        }

    }
};

module.exports = resolvers;