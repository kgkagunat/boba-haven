const db = require('../config/connection');
const { Drink, Size, Orders, User } = require('../models');
const drinkSeeds = require('./drinkData.json');
const sizeSeeds = require('./sizeData.json');
const userSeeds = require('./userData.json');

db.once('open', async () => {
    try {
        await Orders.deleteMany({});
        await Drink.deleteMany({});
        await Size.deleteMany({});
        await User.deleteMany({});
        

        await Size.create(sizeSeeds);
        await Drink.create(drinkSeeds);
        await User.create(userSeeds);

        console.log('all done!');
        process.exit(0);
    } catch (err) {
        throw err;
    }
});