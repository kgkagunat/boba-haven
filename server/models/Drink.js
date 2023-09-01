const { Schema, model } = require('mongoose');

const drinkSchema = new Schema({
  name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
  },
  description: {
      type: String,
      required: true,
  
  },
  mediumPrice: {        // This is the base price for the drinks
      type: Number,
      required: true,
  },
  image: {
      type: String,
      required: true,
  },
});

// Virtual fields to get small and large prices for drinks
drinkSchema.virtual('smallPrice').get(function () {
  return this.mediumPrice - 1.00;
});

drinkSchema.virtual('largePrice').get(function () {
  return this.mediumPrice + 1.00;
});

const Drink = model('Drink', drinkSchema);

module.exports = Drink;
