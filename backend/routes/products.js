const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/auth');
const { validateProduct } = require('../validators/productValidator');

// Public read config & single product
router.get('/config', productController.getProductsConfig);
router.get('/:slug', productController.getProductBySlug);

// Public read all active products
router.get('/', productController.getProducts);

// Admin operations
router.get('/all', authMiddleware, productController.getAllProducts);
router.put('/config', authMiddleware, productController.updateProductsConfig);
router.post('/', authMiddleware, validateProduct, productController.createProduct);
router.put('/:id', authMiddleware, validateProduct, productController.updateProduct);
router.delete('/:id', authMiddleware, productController.deleteProduct);

module.exports = router;
