const mongoose = require('mongoose');
const ConsumerSchema = new mongoose.Schema({
    name: String,
    Address: { type: String },
    createdAt: { type: Date, default: Date.now },
    mobile_number:String,
});
module.exports = mongoose.model('User', ConsumerSchema);