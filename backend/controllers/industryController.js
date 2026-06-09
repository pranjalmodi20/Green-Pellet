const Industry = require('../models/Industry');

// @desc    Get all active industry cards
// @route   GET /api/industries
// @access  Public
exports.getIndustries = async (req, res) => {
  try {
    const industries = await Industry.find({ isActive: true }).sort({ order: 1 });
    res.json(industries);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all industry cards (Admin)
// @route   GET /api/industries/all
// @access  Private/Admin
exports.getAllIndustries = async (req, res) => {
  try {
    const industries = await Industry.find().sort({ order: 1 });
    res.json(industries);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a new industry bento card
// @route   POST /api/industries
// @access  Private/Admin
exports.createIndustry = async (req, res) => {
  try {
    const industry = new Industry(req.body);
    await industry.save();
    res.status(201).json(industry);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update an industry card
// @route   PUT /api/industries/:id
// @access  Private/Admin
exports.updateIndustry = async (req, res) => {
  try {
    const industry = await Industry.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!industry) {
      return res.status(404).json({ message: 'Industry card not found' });
    }
    res.json(industry);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete an industry card
// @route   DELETE /api/industries/:id
// @access  Private/Admin
exports.deleteIndustry = async (req, res) => {
  try {
    const industry = await Industry.findByIdAndDelete(req.params.id);
    if (!industry) {
      return res.status(404).json({ message: 'Industry card not found' });
    }
    res.json({ message: 'Industry bento card removed successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};
