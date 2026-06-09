const express = require('express');
const router = express.Router();
const Newsletter = require('../models/Newsletter');
const authMiddleware = require('../middleware/auth');

// @route   POST /api/newsletter/subscribe
// @desc    Subscribe to newsletter (public)
router.post('/subscribe', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required' });
  try {
    const existing = await Newsletter.findOne({ email: email.toLowerCase() });
    if (existing) return res.status(400).json({ message: 'Already subscribed' });
    const entry = new Newsletter({ email: email.toLowerCase() });
    await entry.save();
    res.status(201).json({ message: 'Subscribed successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/newsletter/subscribers
// @desc    Get all subscribers (admin only)
router.get('/subscribers', authMiddleware, async (req, res) => {
  try {
    const subscribers = await Newsletter.find().sort({ subscribedAt: -1 });
    res.json(subscribers);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/newsletter/:id
// @desc    Remove a subscriber (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Newsletter.findByIdAndDelete(req.params.id);
    res.json({ message: 'Subscriber removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
