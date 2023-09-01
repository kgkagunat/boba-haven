const db = require('../config/connection');
const { Drink, Size, Orders, User } = require('../models');
const drinkSeeds = require('./drinkData.json');
const sizeSeeds = require('./sizeData.json');
const userSeeds = require('./userData.json');

db.once('open', async () => {
    try {
        // Delete existing data first
        await Orders.deleteMany({});
        await Drink.deleteMany({});
        await Size.deleteMany({});
        await User.deleteMany({});
        
        // Get sizes back from seed
        const createdSizes = await Size.create(sizeSeeds);
        // Map sizes with the drinks
        const drinksWithSize = drinkSeeds.map(drink => {
            drink.sizeOptions = createdSizes.map(size => size._id);
            return drink;
        });

        await Drink.create(drinksWithSize);
        await User.create(userSeeds);

        console.log('all done!');
        process.exit(0);
    } catch (err) {
        throw err;
    }
});