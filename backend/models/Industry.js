const mongoose = require('mongoose');

const IndustrySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Industry title is required'],
    trim: true
  },
  description: {
    type: String,
    required: function() { return ['hero', 'medium'].includes(this.type); },
    trim: true
  },
  image: {
    type: String,
    required: function() { return ['hero', 'medium'].includes(this.type); }
  },
  icon: {
    type: String,
    required: function() { return ['small', 'accent'].includes(this.type); }
  },
  type: {
    type: String,
    enum: ['hero', 'medium', 'small', 'accent'],
    required: [true, 'Industry card type is required (hero, medium, small, accent)']
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Industry', IndustrySchema);
