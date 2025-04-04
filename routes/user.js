const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


router.post("/", async (req, res) => {
  try {
    const user = new User(req.body);
    const newUser = await user.save();
    res.status(201).json({ data: newUser });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});


router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ data: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
