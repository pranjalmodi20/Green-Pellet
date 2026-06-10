const mongoose = require('mongoose');

const SpecificationSchema = new mongoose.Schema({
  parameter: { type: String, required: true },
  value: { type: String, required: true },
  unit: { type: String, default: '' }
}, { _id: false });

const DownloadSchema = new mongoose.Schema({
  label: { type: String, required: true },
  url: { type: String, required: true }
}, { _id: false });

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Product title is required'],
    trim: true
  },
  slug: {
    type: String,
    required: [true, 'Product slug is required'],
    unique: true,
    trim: true
  },
  shortDescription: {
    type: String,
    required: [true, 'Product short description is required'],
    trim: true
  },
  fullDescription: {
    type: String,
    trim: true
  },
  // Legacy support field (mapping to shortDescription)
  description: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    required: [true, 'Product image URL/path is required']
  },
  gallery: {
    type: [String],
    default: []
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductCategory'
  },
  specifications: {
    type: [SpecificationSchema],
    default: []
  },
  // Legacy support field (mapping to specifications primary entry)
  spec: {
    type: String,
    trim: true
  },
  benefits: {
    type: [String],
    default: []
  },
  applications: {
    type: [String],
    default: []
  },
  technicalData: {
    ash: { type: String, default: '' },
    moisture: { type: String, default: '' },
    density: { type: String, default: '' },
    diameter: { type: String, default: '' }
  },
  downloads: {
    type: [DownloadSchema],
    default: []
  },
  featured: {
    type: Boolean,
    default: false
  },
  displayOrder: {
    type: Number,
    default: 0
  },
  // Legacy support field (mapping to displayOrder)
  order: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  // Legacy support field (mapping to status === 'active')
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

// Pre-save middleware to synchronize legacy fields
ProductSchema.pre('save', function (next) {
  if (this.shortDescription && !this.description) {
    this.description = this.shortDescription;
  }
  if (this.description && !this.shortDescription) {
    this.shortDescription = this.description;
  }
  if (this.displayOrder && !this.order) {
    this.order = this.displayOrder;
  }
  if (this.order && !this.displayOrder) {
    this.displayOrder = this.order;
  }
  if (this.status) {
    this.isActive = this.status === 'active';
  } else if (this.isActive !== undefined) {
    this.status = this.isActive ? 'active' : 'inactive';
  }
  next();
});

module.exports = mongoose.model('Product', ProductSchema);