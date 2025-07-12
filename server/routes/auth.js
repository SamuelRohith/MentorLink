const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/register', async (req, res) => {
  const { email, username, password, role } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'Email already exists' });
    user = await User.findOne({ username });
    if (user) return res.status(400).json({ msg: 'Username already exists' });

    user = new User({ email, username, password, role: role === 'admin' ? 'admin' : 'student' });
    await user.save();
    res.json({ msg: 'Registration successful', user });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) return res.status(400).json({ msg: 'Invalid credentials' });
    res.json({ msg: 'Login successful', user });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

router.post('/logout', (req, res) => {
  res.json({ msg: 'Logout successful' });
});

module.exports = router;