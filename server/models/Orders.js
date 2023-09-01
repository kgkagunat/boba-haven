const mongoose = require('mongoose');
const { Schema } = mongoose;

const ordersSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  drinks: [
    {
      drink: {
        type: Schema.Types.ObjectId,
        ref: 'Drink'
      },
      quantity: {
        type: Number,
        required: true
      },
      size: {
        type: String,
        enum: ['small', 'medium', 'large'],
        required: true
      },
      priceAtOrderTime: {
        type: Number,
        required: true
      }
    }
  ]
}, { timestamps: true });

const Orders = mongoose.model('Orders', ordersSchema);

module.exports = Orders;
