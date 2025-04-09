const express = require("express");
const router = express.Router();
const Consumer = require("../models/Consumer");

router.get("/", async (req, res) => {
  try {
    const consumer = await Consumer.find();
    res.status(200).json({ data: consumer });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


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


router.post("/", async (req, res) => {
  try {
    const consumer = new Consumer(req.body);
    const newConsumer = await consumer.save();
    res.status(201).json({ data: newConsumer });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

router.post("/login", async (req, res) => {
  const { mobile_number, password } = req.body; 
  try {
    const consumer = await Consumer.findOne({ mobile_number});
    if (!consumer){
      res.status(401).send("Invalid Mobile Number")
    }
    
    if(consumer.password != password){
      res.status(401).send("Invalid Password")
    }
    res.status(200).json({ message:"Login successful", data: consumer});
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});



router.put("/:id", async (req, res) => {
  try {
    const updatedConsumer = await Consumer.findByIdAndUpdate(
      req.params.id,
      req.body,
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
