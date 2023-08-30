const { Schema, model } = require('mongoose');

const ordersSchema = new Schema({
    purchaseDate: {
        type: Date,
        default: Date.now,
    },
    drinks: [
        {
        type: Schema.Types.ObjectId,
        ref: 'Drink',
        },
    ],

});

const Orders = model('Orders', ordersSchema);

module.exports = Orders;