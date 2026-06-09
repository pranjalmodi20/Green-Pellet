const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Author name is required'],
    trim: true
  },
  role: {
    type: String,
    required: [true, 'Author role is required'],
    trim: true
  },
  company: {
    type: String,
    default: '',
    trim: true
  },
  quote: {
    type: String,
    required: [true, 'Testimonial quote text is required'],
    trim: true
  },
  avatar: {
    type: String,
    default: ''
  },
  rating: {
    type: Number,
    default: 5,
    min: 1,
    max: 5
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', TestimonialSchema);
