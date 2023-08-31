const mongoose = require('mongoose');

const { Schema } = mongoose;

const ordersSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  drinks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Drink'
    }
  ]
});

const Orders = mongoose.model('Orders', ordersSchema);

module.exports = Orders;
