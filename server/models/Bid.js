const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
  auction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Auction',
    required: true
  },
  bidder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: [true, 'Bid amount is required'],
    min: [0, 'Bid amount must be positive']
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Index for faster queries
bidSchema.index({ auction: 1, timestamp: -1 });
bidSchema.index({ bidder: 1 });

module.exports = mongoose.model('Bid', bidSchema);
