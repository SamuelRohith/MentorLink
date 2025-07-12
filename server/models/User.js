const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  role: { type: String, enum: ['mentor', 'student'], required: true },
  academicDetails: {
    year: String,
    major: String,
    institution: String,
  },
  tags: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);