const HomeConfig = require('../models/HomeConfig');
const Metric = require('../models/Metric');

// @desc    Get complete Home Page configurations (Hero, Crisis, CTA, Footer)
// @route   GET /api/home/config
// @access  Public
exports.getHomeConfig = async (req, res) => {
  try {
    let config = await HomeConfig.findOne();
    if (!config) {
      // Create a default config if it doesn't exist
      config = await HomeConfig.create({
        footerSocialLinks: [
          { platform: 'LinkedIn', url: '#', icon: 'share' },
          { platform: 'Website', url: '#', icon: 'public' }
        ]
      });
    }
    res.json(config);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update Home Page configurations
// @route   PUT /api/home/config
// @access  Private/Admin
exports.updateHomeConfig = async (req, res) => {
  try {
    let config = await HomeConfig.findOne();
    if (!config) {
      config = new HomeConfig(req.body);
    } else {
      // Dynamically update fields
      Object.assign(config, req.body);
    }
    await config.save();
    res.json(config);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get real-time statistics/metrics
// @route   GET /api/home/metrics
// @access  Public
exports.getMetrics = async (req, res) => {
  try {
    let metric = await Metric.findOne();
    if (!metric) {
      metric = await Metric.create({ tonsProcessed: 1200000, co2Offset: 450000 });
    }
    res.json(metric);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update real-time statistics/metrics
// @route   PUT /api/home/metrics
// @access  Private/Admin
exports.updateMetrics = async (req, res) => {
  const { tonsProcessed, co2Offset } = req.body;
  try {
    let metric = await Metric.findOne();
    if (!metric) {
      metric = new Metric({ tonsProcessed, co2Offset });
    } else {
      if (tonsProcessed !== undefined) metric.tonsProcessed = tonsProcessed;
      if (co2Offset !== undefined) metric.co2Offset = co2Offset;
    }
    await metric.save();
    res.json(metric);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};
