const express = require("express");
const router = express.Router();
const Vendor = require("../models/Vendor");

router.get("/", async (req, res) => {
  try {
    const vendor = await Vendor.find();
    res.status(200).json({ data: vendor });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    res.status(200).json({ data: vendor });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


router.post("/", async (req, res) => {
  try {
    const vendor = new Vendor(req.body);
    const newVendor = await vendor.save();
    res.status(201).json({ data: newVendor });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

router.post("/login", async (req, res) => {
  const { mobile_number, password } = req.body; 
  try {
    const vendor = await Vendor.findOne({ mobile_number});
    if (!vendor){
      res.status(401).send("Invalid Mobile Number")
    }
    
    if(vendor.password != password){
      res.status(401).send("Invalid Password")
    }
    res.status(200).json({ message:"Login successful", data: vendor});
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});



router.put("/:id", async (req, res) => {
  try {
    const updatedVendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      req.body,
    );

    if (!updatedVendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res.status(200).json({ data: updatedVendor });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const deletedVendor = await Vendor.findByIdAndDelete(req.params.id);
    
    if (!deletedVendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res.status(200).json({ message: "Vendor deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
