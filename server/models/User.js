const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'mentor', 'admin'], default: 'student' },
  academicDetails: {
    year: String,
    major: String,
    institution: String,
  },
  tags: [String],
});

module.exports = mongoose.model('User', userSchema);