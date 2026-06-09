const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonialController');
const authMiddleware = require('../middleware/auth');
const { validateTestimonial } = require('../validators/testimonialValidator');

// Public read
router.get('/', testimonialController.getTestimonials);

// Admin operations
router.get('/all', authMiddleware, testimonialController.getAllTestimonials);
router.post('/', authMiddleware, validateTestimonial, testimonialController.createTestimonial);
router.put('/:id', authMiddleware, validateTestimonial, testimonialController.updateTestimonial);
router.delete('/:id', authMiddleware, testimonialController.deleteTestimonial);

module.exports = router;
