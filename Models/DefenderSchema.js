const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Updated Defender Schema
const defenderSchema = new Schema({
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
  role: {
    type: String,
    default: 'Defender'
  },
  assignedLawyer: {
    type: Schema.Types.ObjectId,
    ref: 'Lawyer'
  },
  caseStatus: {
    type: String,
    enum: ['Pending', 'Resolved', 'Closed'],
    default: 'Pending'
  },
  cases: [{
    type: Number  // Storing multiple case IDs
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Defender', defenderSchema);
