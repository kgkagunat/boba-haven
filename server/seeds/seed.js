const db = require('../config/connection');
const { Drink, Size, Orders, User } = require('../models');
const drinkSeeds = require('./drinkSeeds.json');
const sizeSeeds = require('./sizeSeeds.json');
const userSeeds = require('./userSeeds.json');

db.once('open', async () => {
    try {
        await Drink.deleteMany({});
        await Size.deleteMany({});
        await User.deleteMany({});
        await Orders.deleteMany({});

        await Size.create(sizeSeeds);
        await Drink.create(drinkSeeds);
        await User.create(userSeeds);

        console.log('all done!');
        process.exit(0);
    } catch (err) {
        throw err;
    }
});