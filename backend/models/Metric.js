const mongoose = require('mongoose');

const MetricSchema = new mongoose.Schema({
  tonsProcessed: {
    type: Number,
    required: true,
    default: 1200000
  },
  co2Offset: {
    type: Number,
    required: true,
    default: 450000
  }
}, { timestamps: true });

module.exports = mongoose.model('Metric', MetricSchema);
