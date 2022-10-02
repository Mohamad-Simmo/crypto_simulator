const express = require('express');
const protect = require('../middleware/authMiddleware');
const router = express.Router();
const { buy, sell, getBuys } = require('../controllers/tradeController');

router.get('/', protect, getBuys);
router.post('/buy', protect, buy);
router.post('/sell', protect, sell);
// router.get('/history')

module.exports = router;
