const express = require("express");
const router = express.Router();
const TransportBooking = require("../models/TransportBooking");

router.get("/", async (req, res) => {
  try {
    const transportbooking = await TransportBooking.find();
    res.status(200).json({ data: transportbooking });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const transportbooking = await TransportBooking.findById(req.params.id);
    if (!transportbooking) {
      return res.status(404).json({ message: "TransportBooking not found" });
    }
    res.status(200).json({ data: transportbooking });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


router.post("/", async (req, res) => {
  try {
    const transportbooking = new TransportBooking(req.body);
    const newTransportBooking = await transportbooking.save();
    res.status(201).json({ data: newTransportBooking });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});


router.put("/:id", async (req, res) => {
  try {
    const updatedTransportBooking = await TransportBooking.findByIdAndUpdate(
      req.params.id,
      req.body,
    );

    if (!updatedTransportBooking) {
      return res.status(404).json({ message: "TransportBooking not found" });
    }

    res.status(200).json({ data: updatedTransportBooking });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const deletedTransportBooking = await TransportBooking.findByIdAndDelete(req.params.id);
    
    if (!deletedTransportBooking) {
      return res.status(404).json({ message: "TransportBooking not found" });
    }

    res.status(200).json({ message: "TransportBooking deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
