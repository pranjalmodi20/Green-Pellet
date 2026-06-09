const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/auth');
const { validateProduct } = require('../validators/productValidator');

// Public read
router.get('/', productController.getProducts);

// Admin operations
router.get('/all', authMiddleware, productController.getAllProducts);
router.post('/', authMiddleware, validateProduct, productController.createProduct);
router.put('/:id', authMiddleware, validateProduct, productController.updateProduct);
router.delete('/:id', authMiddleware, productController.deleteProduct);

module.exports = router;
