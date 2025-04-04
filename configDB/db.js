const mongoose = require('mongoose');
require('dotenv').config()

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI)
    console.log("MongoDB Connected:");
  } catch (error) {
    console.error(error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
