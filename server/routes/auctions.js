const express = require('express');
const router = express.Router();
const {
  getAuctions,
  getAuction,
  createAuction,
  updateAuction,
  deleteAuction,
  getUserAuctions
} = require('../controllers/auctionController');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(getAuctions)
  .post(protect, createAuction);

router.route('/:id')
  .get(getAuction)
  .put(protect, updateAuction)
  .delete(protect, deleteAuction);

router.get('/user/:userId', getUserAuctions);

module.exports = router;
