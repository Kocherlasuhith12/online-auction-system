const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Electronics', 'Fashion', 'Home & Garden', 'Sports', 'Collectibles', 'Art', 'Books', 'Toys', 'Automotive', 'Other']
  },
  startingPrice: {
    type: Number,
    required: [true, 'Starting price is required'],
    min: [0, 'Starting price must be positive']
  },
  currentPrice: {
    type: Number,
    default: function() {
      return this.startingPrice;
    }
  },
  buyNowPrice: {
    type: Number,
    min: [0, 'Buy now price must be positive']
  },
  imageUrl: {
    type: String,
    default: 'https://via.placeholder.com/400x300?text=No+Image'
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required']
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'cancelled'],
    default: 'active'
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  highestBidder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  bids: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bid'
  }],
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for faster queries
auctionSchema.index({ status: 1, endDate: -1 });
auctionSchema.index({ category: 1 });
auctionSchema.index({ seller: 1 });

// Virtual for checking if auction is expired
auctionSchema.virtual('isExpired').get(function() {
  return this.endDate < new Date();
});

// Update status based on end date
auctionSchema.pre('save', function(next) {
  if (this.endDate < new Date() && this.status === 'active') {
    this.status = 'completed';
  }
  next();
});

module.exports = mongoose.model('Auction', auctionSchema);
