const { Schema, model } = require('mongoose');

const drinkSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const Drink = model('Drink', drinkSchema);

module.exports = Tech;
