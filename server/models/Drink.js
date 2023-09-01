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
  sizeOptions: [
    {
        type: Schema.Types.ObjectId,
        ref: 'Size',
    },
  ],
  
  image: {
      type: String,
      required: true,
  },

});

const Drink = model('Drink', drinkSchema);

module.exports = Drink;
