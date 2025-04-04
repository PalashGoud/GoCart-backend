const mongoose = require('mongoose');
const VendorSchema = new mongoose.Schema({
    shopName: String,
    address: String,
    name: String,
    mobile_number: String,
    addhar_card:String,
    addhar_front_image:String,
    aadhar_back_image:String,
    city:String
});
module.exports = mongoose.model('Vendor', VendorSchema);