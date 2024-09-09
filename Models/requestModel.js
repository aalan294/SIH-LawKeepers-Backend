const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Request Schema
const requestSchema = new Schema({
  defendant: {
    type: Schema.Types.ObjectId,
    ref: 'Defender', // Reference to the Defendant model
    required: true
  },
  lawyer: {
    type: Schema.Types.ObjectId,
    ref: 'Lawyer', // Reference to the Lawyer model
    required: true
  },
  caseId:{
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['requested', 'accepted'],
    default: 'requested', // Initial state is 'requested'
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now // Track when the request was created
  },
  updatedAt: {
    type: Date,
    default: Date.now // Track when the request was last updated
  }
});

// Pre-save middleware to automatically update `updatedAt` on document updates
requestSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Request', requestSchema);
