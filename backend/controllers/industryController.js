const Industry = require('../models/Industry');

// @desc    Get all active industries
// @route   GET /api/industries
// @access  Public
exports.getIndustries = async (req, res) => {
  try {
    const industries = await Industry.find({ status: 'active' })
      .populate('caseStudies')
      .sort({ displayOrder: 1 });
    res.json(industries);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single industry by slug
// @route   GET /api/industries/:slug
// @access  Public
exports.getIndustryBySlug = async (req, res) => {
  try {
    const industry = await Industry.findOne({ slug: req.params.slug, status: 'active' })
      .populate('caseStudies');
    if (!industry) {
      return res.status(404).json({ message: 'Industry not found' });
    }
    res.json(industry);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all industries including inactive (Admin)
// @route   GET /api/industries/all
// @access  Private/Admin
exports.getAllIndustries = async (req, res) => {
  try {
    const industries = await Industry.find()
      .populate('caseStudies')
      .sort({ displayOrder: 1 });
    res.json(industries);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a new industry
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

// @desc    Update an industry
// @route   PUT /api/industries/:id
// @access  Private/Admin
exports.updateIndustry = async (req, res) => {
  try {
    const industry = await Industry.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!industry) {
      return res.status(404).json({ message: 'Industry not found' });
    }
    res.json(industry);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete an industry
// @route   DELETE /api/industries/:id
// @access  Private/Admin
exports.deleteIndustry = async (req, res) => {
  try {
    const industry = await Industry.findById(req.params.id);
    if (!industry) {
      return res.status(404).json({ message: 'Industry not found' });
    }
    await Industry.findByIdAndDelete(req.params.id);
    res.json({ message: 'Industry removed successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};
