const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Consumer = require("../models/Consumer");

const JWT_SECRET = "palash_go_cart"; 

router.get("/", async (req, res) => {
  try {
    const consumers = await Consumer.find();
    res.status(200).json({ data: consumers });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const consumer = await Consumer.findById(req.params.id);
    if (!consumer) return res.status(404).json({ message: "Consumer not found" });
    res.status(200).json({ data: consumer });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(5)
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const consumer = new Consumer({ ...req.body, password: hashedPassword });
    await consumer.save();
   const token =   jwt.sign(consumer.email, JWT_SECRET)
    res.status(201).json({ data: consumer,  token:token});
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

router.post("/login", async (req, res) => {
  const { mobile_number, password } = req.body;
  try {
    const consumer = await Consumer.findOne({ mobile_number });
    if (!consumer) return res.status(401).send("Invalid Mobile Number");
    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, consumer.password);
    if (!isMatch) return res.status(401).send("Invalid Password");
    // Generate JWT token
    const token = await jwt.sign({ id: consumer._id }, JWT_SECRET, { expiresIn: "2h" });
    res.status(200).json({
      message: "Login successful",
      data: {
        _id: consumer._id,
        name: consumer.name,
        mobile_number: consumer.mobile_number,
        email: consumer.email,
        token,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedConsumer = await Consumer.findByIdAndUpdate(req.params.id, req.body);
    if (!updatedConsumer) return res.status(404).json({ message: "Consumer not found" });
    res.status(200).json({ data: updatedConsumer });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedConsumer = await Consumer.findByIdAndDelete(req.params.id);
    if (!deletedConsumer) return res.status(404).json({ message: "Consumer not found" });
    res.status(200).json({ message: "Consumer deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
