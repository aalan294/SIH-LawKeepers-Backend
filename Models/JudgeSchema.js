const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Judge Schema
const judgeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  walletAddress: {   // Wallet address for blockchain interactions
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'Judge'
  },
  assignedCases: [{
    type: Schema.Types.ObjectId,
    ref: 'Case'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Judge', judgeSchema);
