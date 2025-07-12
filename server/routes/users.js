const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/mentors', async (req, res) => {
  const { tag } = req.query;
  const query = { role: 'mentor' };
  if (tag) query.tags = tag;
  const mentors = await User.find(query);
  res.json(mentors);
});

module.exports = router;