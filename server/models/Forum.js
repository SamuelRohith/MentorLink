const mongoose = require('mongoose');

const forumSchema = new mongoose.Schema({
  question: { type: String, required: true },
  category: { type: String, required: true },
  anonymous: { type: Boolean, default: false },
  askedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Forum', forumSchema);