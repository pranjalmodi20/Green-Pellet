const express = require('express');
const router = express.Router();
const whyBiomassController = require('../controllers/whyBiomassController');
const authMiddleware = require('../middleware/auth');
const { validateWhyBiomassPage } = require('../validators/whyBiomassValidator');

router.get('/', whyBiomassController.getWhyBiomassPage);
router.put('/', authMiddleware, validateWhyBiomassPage, whyBiomassController.updateWhyBiomassPage);

module.exports = router;
