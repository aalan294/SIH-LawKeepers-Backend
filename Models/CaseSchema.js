const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const caseSchema = new Schema({
    caseId: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
      required: true
    },
    firDocumentCID: {
      type: String,
      required: true
    },
    proofs: [{
      name: String,
      cid: String
    }],
    status: {
      type: String,
      default: 'Open'
    },
    judgement: String,
    hearingCount: {
      type: Number,
      default: 0
    },
    assignedJudge: {
      type: Schema.Types.ObjectId,
      ref: 'Judge'
    },
    lawyers: [{
      type: Schema.Types.ObjectId,
      ref: 'Lawyer'
    }],
    defendants: [{
      type: Schema.Types.ObjectId,
      ref: 'Defender'
    }],
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  
  module.exports = mongoose.model('Case', caseSchema);
  