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
  prices: {
      small: {
          type: Number,
          required: true,
      },
      medium: {
          type: Number,
          required: true,
      },
      large: {
          type: Number,
          required: true,
      }
  },
  image: {
      type: String,
      required: true,
  },
});

const Drink = model('Drink', drinkSchema);

module.exports = Drink;
