const express = require("express");
const router = express.Router();
const Consumer = require("../models/Consumer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "yourSecretKey123"; // Replace with environment variable in production

// ✅ Get all consumers
router.get("/", async (req, res) => {
  try {
    const consumer = await Consumer.find();
    res.status(200).json({ data: consumer });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get single consumer by ID
router.get("/:id", async (req, res) => {
  try {
    const consumer = await Consumer.findById(req.params.id);
    if (!consumer) {
      return res.status(404).json({ message: "Consumer not found" });
    }
    res.status(200).json({ data: consumer });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Register a new consumer with hashed password
router.post("/", async (req, res) => {
  try {
    const { name, Address, mobile_number, password } = req.body;

    const existing = await Consumer.findOne({ mobile_number });
    if (existing) {
      return res.status(400).json({ message: "Mobile number already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const consumer = new Consumer({
      name,
      Address,
      mobile_number,
      password: hashedPassword,
    });

    const newConsumer = await consumer.save();
    res.status(201).json({ data: newConsumer });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

// ✅ Login with JWT token
router.post("/login", async (req, res) => {
  const { mobile_number, password } = req.body;
  try {
    const consumer = await Consumer.findOne({ mobile_number });
    if (!consumer) {
      return res.status(401).json({ message: "Invalid Mobile Number" });
    }

    const isMatch = await bcrypt.compare(password, consumer.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    const token = jwt.sign({ consumerId: consumer._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      message: "Login successful",
      data: {
        _id: consumer._id,
        name: consumer.name,
        mobile_number: consumer.mobile_number,
        token: token,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// ✅ Update consumer by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedConsumer = await Consumer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedConsumer) {
      return res.status(404).json({ message: "Consumer not found" });
    }

    res.status(200).json({ data: updatedConsumer });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// ✅ Delete consumer by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedConsumer = await Consumer.findByIdAndDelete(req.params.id);
    if (!deletedConsumer) {
      return res.status(404).json({ message: "Consumer not found" });
    }

    res.status(200).json({ message: "Consumer deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
