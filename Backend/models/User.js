const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true, required: true },
    password: String,
    role: { type: String, enum: ['consumer', 'vendor', 'transporter'], required: true },
    Address: { type: String },
    createdAt: { type: Date, default: Date.now },
    cartList: Array
});
module.exports = mongoose.model('User', UserSchema);