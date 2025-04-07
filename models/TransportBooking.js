const mongoose = require('mongoose');
const TransportBookingSchema = new mongoose.Schema({
    consumerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    transporterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    pickupLocation: String,
    dropLocation: String,
    status: { type: String, enum: ['pending', 'accepted', 'completed', 'cancelled'], default: 'pending' },
    price: Number
});
module.exports = mongoose.model('TransportBooking', TransportBookingSchema);