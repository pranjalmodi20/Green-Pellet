const express = require('express');
const router = express.Router();
const industryController = require('../controllers/industryController');
const authMiddleware = require('../middleware/auth');
const { validateIndustry } = require('../validators/industryValidator');

// Public read
router.get('/', industryController.getIndustries);

// Admin operations
router.get('/all', authMiddleware, industryController.getAllIndustries);
router.post('/', authMiddleware, validateIndustry, industryController.createIndustry);
router.put('/:id', authMiddleware, validateIndustry, industryController.updateIndustry);
router.delete('/:id', authMiddleware, industryController.deleteIndustry);

module.exports = router;
