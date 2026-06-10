const mongoose = require('mongoose');

const CaseStudyResultSchema = new mongoose.Schema({
  metric: { type: String, required: true },
  value: { type: String, required: true },
  unit: { type: String }
}, { _id: false });

const CaseStudySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Case study title is required'],
    trim: true
  },
  slug: {
    type: String,
    required: [true, 'Case study slug is required'],
    trim: true,
    unique: true
  },
  industry: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Industry',
    required: [true, 'Industry reference is required']
  },
  challenge: {
    type: String,
    trim: true
  },
  solution: {
    type: String,
    trim: true
  },
  results: {
    type: [CaseStudyResultSchema],
    default: []
  },
  image: {
    type: String
  },
  pdfUrl: {
    type: String
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
}, { timestamps: true });

module.exports = mongoose.model('CaseStudy', CaseStudySchema);
