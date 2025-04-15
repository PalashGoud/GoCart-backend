// routes/mail.js
const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "palashgoud84@gmail.com" ,
    pass: "wyku qtuu soqt eenl", // Use App Password
  },
});

router.post('/send-otp-mail', async (req, res) => {
  const { to, subject } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);

  const mailOptions = {
    from: 'palashgoud84@gmail.com',
    to,
    subject,
    html: `<div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
        <h2 style="color: #4CAF50;">GoCart OTP Verification</h2>
        <p>Use this OTP to reset your password:</p>
        <h1 style="letter-spacing: 4px;">${otp}</h1>
        <p>This OTP is valid for 10 minutes.</p>
      </div>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: 'OTP sent', otp }); // send OTP back only for testing (remove in prod)
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send OTP" });
  }
});

module.exports = router;
