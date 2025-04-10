const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// Get all orders with populated product details
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("products.productId") // Populate product details
      .populate("consumerId", "name") // Optional: populate consumer name
      .populate("vendorId", "shopName"); // Optional: populate vendor info

    res.status(200).json({ data: orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get single order by ID
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("products.productId");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ data: order });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get orders by consumer ID
router.get("/consumer/:id", async (req, res) => {
  try {
    const orders = await Order.find({ consumerId: req.params.id })
      .populate("products.productId")
      .populate("consumerId", "name")
      .populate("vendorId", "shopName");

    res.status(200).json({ data: orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


// Create new order
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

// Update an order by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return updated document
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

// Delete an order by ID
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
