const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

router.get("/", async (req, res) => {
  try {
    const order = await Order.find();
    res.status(200).json({ data: order });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ data: order });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


router.post("/", async (req, res) => {
  try {
    const order = new Order(req.body);
    const newOrder = await order.save();
    res.status(201).json({ data: newOrder });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});


router.put("/:id", async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ data: updatedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
