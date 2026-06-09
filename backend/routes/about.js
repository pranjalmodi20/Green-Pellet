const express = require('express');
const router = express.Router();
const aboutController = require('../controllers/aboutController');
const authMiddleware = require('../middleware/auth');
const { validateAboutPage } = require('../validators/aboutValidator');

router.get('/', aboutController.getAboutPage);
router.put('/', authMiddleware, validateAboutPage, aboutController.updateAboutPage);

module.exports = router;
