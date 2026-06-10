const mongoose = require('mongoose');

const ProductCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    trim: true,
    unique: true
  },
  slug: {
    type: String,
    required: [true, 'Category slug is required'],
    trim: true,
    unique: true
  },
  description: {
    type: String,
    trim: true
  }
}, { timestamps: true });

module.exports = mongoose.model('ProductCategory', ProductCategorySchema);
