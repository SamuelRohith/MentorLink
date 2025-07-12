const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
  question: { type: String, required: true },
  category: { type: String, required: true },
  anonymous: { type: Boolean, default: false },
  askedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['A', 'R'], default: 'A' },
  replies: [{
    text: String,
    username: String,
    timestamp: { type: Date, default: Date.now },
  }],
});

module.exports = mongoose.model('Query', querySchema);