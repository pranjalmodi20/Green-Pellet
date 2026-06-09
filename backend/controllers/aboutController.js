const AboutPage = require('../models/AboutPage');

const migrateLegacyFields = async (about) => {
  let changed = false;

  if (!about.companyStory?.text && about.hero?.subtitle) {
    about.companyStory = {
      text: about.hero.subtitle,
      imageAlt: about.hero.imageAlt || 'Sustainable forest landscape',
    };
    changed = true;
  }

  if (!about.cta) {
    about.cta = {};
    changed = true;
  }

  if (changed) {
    about.markModified('companyStory');
    about.markModified('cta');
    await about.save();
  }

  return about;
};

const markAllModified = (about) => {
  about.markModified('hero');
  about.markModified('companyStory');
  about.markModified('purpose');
  about.markModified('vision');
  about.markModified('mission');
  about.markModified('timeline');
  about.markModified('leadership');
  about.markModified('sustainability');
  about.markModified('achievements');
  about.markModified('cta');
};

// @desc    Get About page content
// @route   GET /api/about
// @access  Public
exports.getAboutPage = async (req, res) => {
  try {
    let about = await AboutPage.findOne();
    if (!about) {
      about = await AboutPage.create({});
    }
    about = await migrateLegacyFields(about);
    res.json(about);
  } catch (err) {
    console.error('GET /api/about error:', err.message);
    res.status(500).json({ message: 'Failed to fetch About page content' });
  }
};

// @desc    Update About page content
// @route   PUT /api/about
// @access  Private/Admin
exports.updateAboutPage = async (req, res) => {
  try {
    const { _id, __v, createdAt, updatedAt, ...updates } = req.body;

    let about = await AboutPage.findOne();
    if (!about) {
      about = new AboutPage(updates);
    } else {
      Object.assign(about, updates);
      markAllModified(about);
    }

    await about.save();
    res.json(about);
  } catch (err) {
    console.error('PUT /api/about error:', err.message);

    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ message: 'Validation failed', errors });
    }

    res.status(500).json({ message: 'Failed to update About page content' });
  }
};
