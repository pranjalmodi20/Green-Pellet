const express = require('express');
const router = express.Router();
const caseStudyController = require('../controllers/caseStudyController');
const authMiddleware = require('../middleware/auth');
const { validateCaseStudy } = require('../validators/caseStudyValidator');

// Public read
router.get('/', caseStudyController.getCaseStudies);

// Admin operations
router.get('/all', authMiddleware, caseStudyController.getAllCaseStudies);
router.post('/', authMiddleware, validateCaseStudy, caseStudyController.createCaseStudy);
router.put('/:id', authMiddleware, validateCaseStudy, caseStudyController.updateCaseStudy);
router.delete('/:id', authMiddleware, caseStudyController.deleteCaseStudy);

module.exports = router;
