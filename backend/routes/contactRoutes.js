const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const authMiddleware = require('../middleware/auth');
const { validateContactSubmission } = require('../validators/contactValidator');

// ── PUBLIC ROUTES ──
router.get('/page', contactController.getContactPage);
router.post('/submit', validateContactSubmission, contactController.submitInquiry);

// ── ADMIN PAGE CONFIG ──
router.put('/page', authMiddleware, contactController.updateContactPage);

// ── ADMIN SUBMISSIONS MANAGEMENT ──
router.get('/submissions', authMiddleware, contactController.getSubmissions);
router.get('/submissions/:id', authMiddleware, contactController.getSubmissionById);
router.put('/submissions/:id', authMiddleware, contactController.updateSubmission);
router.delete('/submissions/:id', authMiddleware, contactController.deleteSubmission);

module.exports = router;