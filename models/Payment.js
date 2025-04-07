const mongoose = require('mongoose');
const PaymentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    transportBookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'TransportBooking' },
    amount: Number,
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
    method: { type: String, enum: ['cash', 'wallet', 'UPI'] }
});
module.exports = mongoose.model('Payment', PaymentSchema);