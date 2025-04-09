const mongoose = require('mongoose');
const ConsumerSchema = new mongoose.Schema({
    name: String,
    password: String,
    Address: { type: String },
    createdAt: { type: Date, default: Date.now },
    cartList: Array,
    number:String,
});
module.exports = mongoose.model('User', ConsumerSchema);