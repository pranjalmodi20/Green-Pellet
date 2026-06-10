const mongoose = require('mongoose');

const BenefitItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String }
}, { _id: false });

const StatItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  value: { type: String, required: true },
  unit: { type: String }
}, { _id: false });

const IndustrySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Industry title is required'],
    trim: true
  },
  slug: {
    type: String,
    required: [true, 'Industry slug is required'],
    trim: true,
    unique: true
  },
  shortDescription: {
    type: String,
    trim: true
  },
  fullDescription: {
    type: String,
    trim: true
  },
  featuredImage: {
    type: String
  },
  gallery: {
    type: [String],
    default: []
  },
  benefits: {
    type: [BenefitItemSchema],
    default: []
  },
  applications: {
    type: [String],
    default: []
  },
  statistics: {
    type: [StatItemSchema],
    default: []
  },
  caseStudies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CaseStudy'
  }],
  quoteText: {
    type: String,
    trim: true
  },
  quoteAuthor: {
    type: String,
    trim: true
  },
  quoteAvatar: {
    type: String
  },
  featured: {
    type: Boolean,
    default: false
  },
  displayOrder: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  // Homepage Bento Grid Compatibility fields
  description: {
    type: String,
    trim: true
  },
  image: {
    type: String
  },
  icon: {
    type: String
  },
  type: {
    type: String,
    enum: ['hero', 'medium', 'small', 'accent']
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

// Pre-save middleware to sync status and isActive, and image/featuredImage
IndustrySchema.pre('save', function(next) {
  if (this.status) {
    this.isActive = this.status === 'active';
  } else if (this.isActive !== undefined) {
    this.status = this.isActive ? 'active' : 'inactive';
  }
  
  if (this.featuredImage && !this.image) {
    this.image = this.featuredImage;
  } else if (this.image && !this.featuredImage) {
    this.featuredImage = this.image;
  }
  
  if (this.displayOrder && !this.order) {
    this.order = this.displayOrder;
  } else if (this.order && !this.displayOrder) {
    this.displayOrder = this.order;
  }
  
  if (typeof next === 'function') {
    next();
  }
});

module.exports = mongoose.model('Industry', IndustrySchema);
