const Auction = require('../models/Auction');
const Bid = require('../models/Bid');

// @desc    Get all auctions
// @route   GET /api/auctions
// @access  Public
const getAuctions = async (req, res) => {
  try {
    const { category, status, search, sort } = req.query;
    
    let query = {};

    // Filter by category
    if (category && category !== 'all') {
      query.category = category;
    }

    // Filter by status
    if (status) {
      query.status = status;
    } else {
      query.status = 'active'; // Default to active auctions
    }

    // Search by title or description
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Sort options
    let sortOption = { createdAt: -1 }; // Default: newest first
    if (sort === 'price_asc') sortOption = { currentPrice: 1 };
    if (sort === 'price_desc') sortOption = { currentPrice: -1 };
    if (sort === 'ending_soon') sortOption = { endDate: 1 };

    const auctions = await Auction.find(query)
      .populate('seller', 'name email')
      .populate('highestBidder', 'name')
      .sort(sortOption);

    res.json(auctions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get single auction
// @route   GET /api/auctions/:id
// @access  Public
const getAuction = async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id)
      .populate('seller', 'name email phone')
      .populate('highestBidder', 'name')
      .populate({
        path: 'bids',
        populate: { path: 'bidder', select: 'name' },
        options: { sort: { timestamp: -1 }, limit: 10 }
      });

    if (!auction) {
      return res.status(404).json({ message: 'Auction not found' });
    }

    // Increment views
    auction.views += 1;
    await auction.save();

    res.json(auction);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Create auction
// @route   POST /api/auctions
// @access  Private
const createAuction = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      startingPrice,
      buyNowPrice,
      imageUrl,
      endDate
    } = req.body;

    // Validation
    if (!title || !description || !category || !startingPrice || !endDate) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const auction = await Auction.create({
      title,
      description,
      category,
      startingPrice,
      currentPrice: startingPrice,
      buyNowPrice,
      imageUrl,
      endDate,
      seller: req.user._id
    });

    res.status(201).json(auction);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update auction
// @route   PUT /api/auctions/:id
// @access  Private
const updateAuction = async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id);

    if (!auction) {
      return res.status(404).json({ message: 'Auction not found' });
    }

    // Check ownership
    if (auction.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this auction' });
    }

    // Don't allow updates if auction has bids
    if (auction.bids.length > 0) {
      return res.status(400).json({ message: 'Cannot update auction with existing bids' });
    }

    const updatedAuction = await Auction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedAuction);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete auction
// @route   DELETE /api/auctions/:id
// @access  Private
const deleteAuction = async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id);

    if (!auction) {
      return res.status(404).json({ message: 'Auction not found' });
    }

    // Check ownership
    if (auction.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this auction' });
    }

    // Don't allow deletion if auction has bids
    if (auction.bids.length > 0) {
      return res.status(400).json({ message: 'Cannot delete auction with existing bids' });
    }

    await auction.deleteOne();

    res.json({ message: 'Auction removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get user's auctions
// @route   GET /api/auctions/user/:userId
// @access  Public
const getUserAuctions = async (req, res) => {
  try {
    const auctions = await Auction.find({ seller: req.params.userId })
      .populate('highestBidder', 'name')
      .sort({ createdAt: -1 });

    res.json(auctions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getAuctions,
  getAuction,
  createAuction,
  updateAuction,
  deleteAuction,
  getUserAuctions
};
