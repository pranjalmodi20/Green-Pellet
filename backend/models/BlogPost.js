const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  excerpt: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  featuredImage: {
    type: String,
    default: ''
  },
  gallery: {
    type: [String],
    default: []
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BlogCategory',
    required: true
  },
  tags: {
    type: [String],
    default: []
  },
  author: {
    name: { type: String, required: true },
    designation: { type: String, required: true },
    image: { type: String, default: '' },
    bio: { type: String, default: '' }
  },
  seo: {
    metaTitle: { type: String, default: '' },
    metaDescription: { type: String, default: '' },
    canonicalUrl: { type: String, default: '' },
    ogTitle: { type: String, default: '' },
    ogDescription: { type: String, default: '' },
    ogImage: { type: String, default: '' },
    twitterTitle: { type: String, default: '' },
    twitterDescription: { type: String, default: '' },
    twitterImage: { type: String, default: '' }
  },
  // Legacy fields kept for backwards compat
  seoTitle: { type: String, default: '' },
  seoDescription: { type: String, default: '' },
  readTime: {
    type: String,
    default: '5 min read'
  },
  featured: {
    type: Boolean,
    default: false
  },
  published: {
    type: Boolean,
    default: true
  },
  publishedAt: {
    type: Date,
    default: Date.now
  },
  scheduledAt: {
    type: Date,
    default: null
  },
  displayOrder: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'draft'],
    default: 'active'
  },
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Virtual for effective seoTitle
blogPostSchema.virtual('effectiveSeoTitle').get(function () {
  return this.seo?.metaTitle || this.seoTitle || this.title;
});

// Virtual for effective seoDescription
blogPostSchema.virtual('effectiveSeoDescription').get(function () {
  return this.seo?.metaDescription || this.seoDescription || this.excerpt;
});

blogPostSchema.index({ slug: 1 });
blogPostSchema.index({ status: 1, published: 1, publishedAt: -1 });
blogPostSchema.index({ featured: -1, displayOrder: 1 });

module.exports = mongoose.model('BlogPost', blogPostSchema);