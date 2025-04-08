const mongoose = require('mongoose');
const VendorSchema = new mongoose.Schema({
    shopName: String,
    address: String,
    name: String,
    mobile_number: String,
    password:String,
    addhar_card:String,
    addhar_front_image:String,
    aadhar_back_image:String,
    shop_image:String,
    city:String,
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }

});
module.exports = mongoose.model('Vendor', VendorSchema);