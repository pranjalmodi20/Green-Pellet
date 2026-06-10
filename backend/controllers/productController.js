const Product = require('../models/Product');
const ProductsHeroConfig = require('../models/ProductsHeroConfig');

// @desc    Get all active products
// @route   GET /api/products
// @access  Public
exports.getProducts = async (req, res) => {
  try {
    const query = { status: 'active' };
    if (req.query.category) {
      query.category = req.query.category;
    }
    const products = await Product.find(query)
      .populate('category')
      .sort({ displayOrder: 1 });
    res.json(products);
  } catch (err) {
    console.error('getProducts error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single product by slug
// @route   GET /api/products/:slug
// @access  Public
exports.getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug }).populate('category');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error('getProductBySlug error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all products including inactive (Admin)
// @route   GET /api/products/all
// @access  Private/Admin
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category').sort({ displayOrder: 1 });
    res.json(products);
  } catch (err) {
    console.error('getAllProducts error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a new product
// @route   POST /api/products
// @access  Private/Admin
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error('createProduct error:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error('updateProduct error:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product removed successfully' });
  } catch (err) {
    console.error('deleteProduct error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get Products Page Hero & CTA Config
// @route   GET /api/products/config
// @access  Public
exports.getProductsConfig = async (req, res) => {
  try {
    let config = await ProductsHeroConfig.findOne();
    if (!config) {
      config = await ProductsHeroConfig.create({});
    }
    res.json(config);
  } catch (err) {
    console.error('getProductsConfig error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update Products Page Hero & CTA Config
// @route   PUT /api/products/config
// @access  Private/Admin
exports.updateProductsConfig = async (req, res) => {
  try {
    const { _id, __v, createdAt, updatedAt, ...updates } = req.body;
    let config = await ProductsHeroConfig.findOne();
    if (!config) {
      config = new ProductsHeroConfig(updates);
    } else {
      Object.assign(config, updates);
      config.markModified('hero');
      config.markModified('cta');
    }
    await config.save();
    res.json(config);
  } catch (err) {
    console.error('updateProductsConfig error:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};