const { Schema, model } = require('mongoose');

const sizeSchema = new Schema({
  size: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      enum: ['small', 'medium', 'large'],
  },
  price: {
      type: Number,
      required: true,
  },

});

const Size = model('Size', sizeSchema);

module.exports = Size;