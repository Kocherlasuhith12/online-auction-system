const Bid = require('../models/Bid');
const Auction = require('../models/Auction');

// @desc    Place a bid
// @route   POST /api/bids/:auctionId
// @access  Private
const placeBid = async (req, res) => {
  try {
    const { amount } = req.body;
    const auctionId = req.params.auctionId;

    // Validation
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Please provide a valid bid amount' });
    }

    const auction = await Auction.findById(auctionId);

    if (!auction) {
      return res.status(404).json({ message: 'Auction not found' });
    }

    // Check if auction is active
    if (auction.status !== 'active') {
      return res.status(400).json({ message: 'This auction is not active' });
    }

    // Check if auction has ended
    if (auction.endDate < new Date()) {
      auction.status = 'completed';
      await auction.save();
      return res.status(400).json({ message: 'This auction has ended' });
    }

    // Check if user is the seller
    if (auction.seller.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'You cannot bid on your own auction' });
    }

    // Check if bid is higher than current price
    if (amount <= auction.currentPrice) {
      return res.status(400).json({ 
        message: `Bid must be higher than current price of $${auction.currentPrice}` 
      });
    }

    // Create bid
    const bid = await Bid.create({
      auction: auctionId,
      bidder: req.user._id,
      amount
    });

    // Update auction
    auction.currentPrice = amount;
    auction.highestBidder = req.user._id;
    auction.bids.push(bid._id);
    await auction.save();

    // Populate bid details
    const populatedBid = await Bid.findById(bid._id)
      .populate('bidder', 'name email')
      .populate('auction', 'title');

    res.status(201).json({
      message: 'Bid placed successfully',
      bid: populatedBid
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get bids for an auction
// @route   GET /api/bids/auction/:auctionId
// @access  Public
const getAuctionBids = async (req, res) => {
  try {
    const bids = await Bid.find({ auction: req.params.auctionId })
      .populate('bidder', 'name')
      .sort({ timestamp: -1 });

    res.json(bids);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get user's bids
// @route   GET /api/bids/user/:userId
// @access  Public
const getUserBids = async (req, res) => {
  try {
    const bids = await Bid.find({ bidder: req.params.userId })
      .populate('auction', 'title status currentPrice endDate imageUrl')
      .sort({ timestamp: -1 });

    res.json(bids);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get user's winning bids
// @route   GET /api/bids/winning/:userId
// @access  Private
const getWinningBids = async (req, res) => {
  try {
    const auctions = await Auction.find({
      highestBidder: req.params.userId,
      status: 'completed'
    }).populate('seller', 'name email phone');

    res.json(auctions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  placeBid,
  getAuctionBids,
  getUserBids,
  getWinningBids
};
