const express = require('express');
const router = express.Router();
const {
  placeBid,
  getAuctionBids,
  getUserBids,
  getWinningBids
} = require('../controllers/bidController');
const { protect } = require('../middleware/auth');

router.post('/:auctionId', protect, placeBid);
router.get('/auction/:auctionId', getAuctionBids);
router.get('/user/:userId', getUserBids);
router.get('/winning/:userId', protect, getWinningBids);

module.exports = router;
