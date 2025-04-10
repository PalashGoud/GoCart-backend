const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
    consumerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
    products: [{ productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },  quantity: Number}],
    status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
    totalPrice: Number,
    createdAt: { type: Date, default: Date.now },
    address: {type: String,required: true},

});
module.exports = mongoose.model('Order', OrderSchema);