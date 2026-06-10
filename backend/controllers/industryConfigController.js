const IndustriesPageConfig = require('../models/IndustriesPageConfig');

const markAllModified = (page) => {
  page.markModified('hero');
  page.markModified('detailedSectors');
  page.markModified('cta');
};

// @desc    Get Industries page config content
// @route   GET /api/industries/config
// @access  Public
exports.getIndustriesConfig = async (req, res) => {
  try {
    let page = await IndustriesPageConfig.findOne();
    if (!page) {
      page = await IndustriesPageConfig.create({});
    }
    res.json(page);
  } catch (err) {
    console.error('GET /api/industries/config error:', err.message);
    res.status(500).json({ message: 'Failed to fetch Industries page configuration' });
  }
};

// @desc    Update Industries page config content
// @route   PUT /api/industries/config
// @access  Private/Admin
exports.updateIndustriesConfig = async (req, res) => {
  try {
    const { _id, __v, createdAt, updatedAt, ...updates } = req.body;

    let page = await IndustriesPageConfig.findOne();
    if (!page) {
      page = new IndustriesPageConfig(updates);
    } else {
      Object.assign(page, updates);
      markAllModified(page);
    }

    await page.save();
    res.json(page);
  } catch (err) {
    console.error('PUT /api/industries/config error:', err.message);

    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ message: 'Validation failed', errors });
    }

    res.status(500).json({ message: 'Failed to update Industries page configuration' });
  }
};
