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
        }

    }
};

module.exports = resolvers;