const express = require('express');
const router = express.Router();
const industryConfigController = require('../controllers/industryConfigController');
const authMiddleware = require('../middleware/auth');

router.get('/', industryConfigController.getIndustriesConfig);
router.put('/', authMiddleware, industryConfigController.updateIndustriesConfig);

module.exports = router;
