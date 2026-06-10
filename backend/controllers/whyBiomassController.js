const WhyBiomassPage = require('../models/WhyBiomassPage');

const markAllModified = (page) => {
  page.markModified('hero');
  page.markModified('definition');
  page.markModified('comparison');
  page.markModified('costComparison');
  page.markModified('carbonNeutral');
  page.markModified('fuelQuality');
  page.markModified('reliability');
  page.markModified('industries');
  page.markModified('cta');
};

// @desc    Get Why Biomass page content
// @route   GET /api/why-biomass
// @access  Public
exports.getWhyBiomassPage = async (req, res) => {
  try {
    let page = await WhyBiomassPage.findOne();
    if (!page) {
      page = await WhyBiomassPage.create({});
    }
    res.json(page);
  } catch (err) {
    console.error('GET /api/why-biomass error:', err.message);
    res.status(500).json({ message: 'Failed to fetch Why Biomass page content' });
  }
};

// @desc    Update Why Biomass page content
// @route   PUT /api/why-biomass
// @access  Private/Admin
exports.updateWhyBiomassPage = async (req, res) => {
  try {
    const { _id, __v, createdAt, updatedAt, ...updates } = req.body;

    let page = await WhyBiomassPage.findOne();
    if (!page) {
      page = new WhyBiomassPage(updates);
    } else {
      Object.assign(page, updates);
      markAllModified(page);
    }

    await page.save();
    res.json(page);
  } catch (err) {
    console.error('PUT /api/why-biomass error:', err.message);

    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ message: 'Validation failed', errors });
    }

    res.status(500).json({ message: 'Failed to update Why Biomass page content' });
  }
};
