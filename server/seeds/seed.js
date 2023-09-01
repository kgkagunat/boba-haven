const db = require('../config/connection');
const { Drink, Orders, User } = require('../models');
const drinkSeeds = require('./drinkData.json');
const userSeeds = require('./userData.json');

db.once('open', async () => {
    try {
        // Delete existing data first
        await Orders.deleteMany({});
        await Drink.deleteMany({});
        await User.deleteMany({});
    
        await Drink.create(drinkSeeds);
        await User.create(userSeeds);

        console.log('all done!');
        process.exit(0);
    } catch (err) {
        throw err;
    }
});