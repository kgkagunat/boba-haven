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
    }
};

module.exports = resolvers;