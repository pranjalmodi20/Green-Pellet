const ProductCategory = require('../models/ProductCategory');

// @desc    Get all product categories
// @route   GET /api/product-categories
// @access  Public
exports.getCategories = async (req, res) => {
  try {
    const categories = await ProductCategory.find().sort({ name: 1 });
    res.json(categories);
  } catch (err) {
    console.error('GET /api/product-categories error:', err.message);
    res.status(500).json({ message: 'Failed to fetch categories' });
  }
};

// @desc    Create a product category
// @route   POST /api/product-categories
// @access  Private/Admin
exports.createCategory = async (req, res) => {
  try {
    const { name, slug, description } = req.body;
    if (!name || !slug) {
      return res.status(400).json({ message: 'Name and slug are required' });
    }

    const category = new ProductCategory({ name, slug, description });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    console.error('POST /api/product-categories error:', err.message);
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Category name or slug already exists' });
    }
    res.status(500).json({ message: 'Failed to create category' });
  }
};

// @desc    Update a product category
// @route   PUT /api/product-categories/:id
// @access  Private/Admin
exports.updateCategory = async (req, res) => {
  try {
    const { name, slug, description } = req.body;
    const category = await ProductCategory.findByIdAndUpdate(
      req.params.id,
      { name, slug, description },
      { new: true, runValidators: true }
    );
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (err) {
    console.error('PUT /api/product-categories error:', err.message);
    res.status(500).json({ message: 'Failed to update category' });
  }
};

// @desc    Delete a product category
// @route   DELETE /api/product-categories/:id
// @access  Private/Admin
exports.deleteCategory = async (req, res) => {
  try {
    const category = await ProductCategory.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json({ message: 'Category removed successfully' });
  } catch (err) {
    console.error('DELETE /api/product-categories error:', err.message);
    res.status(500).json({ message: 'Failed to delete category' });
  }
};
