const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

// @route   POST /api/auth/login
// @desc    Authenticate admin & get token
// @access  Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = {
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name
      }
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET || 'your_jwt_secret_here',
      { expiresIn: '8h' }
    );

    res.json({ token, admin: { email: admin.email, name: admin.name } });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
