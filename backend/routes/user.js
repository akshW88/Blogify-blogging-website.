const express = require('express');
const { createHmac } = require('crypto'); 
const User = require('../models/user');
const router = express.Router();
const jwt=require('jsonwebtoken');

router.post('/signUp', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "Email already exists." });
    }

    await User.create({ name, email, password });

    return res.status(200).json({ success: true, message: "Signup successful. Proceed to login." });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ success: false, message: "Email is not registered." });
    }

    const salt = existingUser.salt;
    const providedPassword = createHmac('sha256', salt).update(password).digest('hex');
    const hashedPassword = existingUser.password; 

    if (providedPassword !== hashedPassword) {
      return res.status(401).json({ success: false, message: "Incorrect password." });
    }
    const token = jwt.sign({ _id: existingUser._id, email: existingUser.email, name: existingUser.name }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'Lax',
      secure: false,
    });

    return res.status(200).json({ success: true, message: "Logged in!" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get('/check-auth', (req, res) => {
  if (req.user) {
    return res.json({ success: true, user: req.user });
  } else {
    return res.json({ success: false });
  }
});

router.get('/logout', (req, res) => {
  try {
    res.clearCookie('token');
    return res.json({success:true, message:"Logged out!"});
  } catch (error) {
    console.log('error', error.message);
  }
});

module.exports = router;
