const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
    name: String,
    price: Number,
    category: String,
    stock: Number
});
module.exports = mongoose.model('Product', ProductSchema);