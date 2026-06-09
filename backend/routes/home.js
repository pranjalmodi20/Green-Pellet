const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const authMiddleware = require('../middleware/auth');
const { validateHomeConfig, validateMetrics } = require('../validators/homeValidator');

// ── Configurations Endpoints ──────────────────────────────────────────
router.get('/config', homeController.getHomeConfig);
router.put('/config', authMiddleware, validateHomeConfig, homeController.updateHomeConfig);

// ── Metrics Endpoints ──────────────────────────────────────────────────
router.get('/metrics', homeController.getMetrics);
router.put('/metrics', authMiddleware, validateMetrics, homeController.updateMetrics);

module.exports = router;
