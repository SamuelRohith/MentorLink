const express = require('express');
const router = express.Router();
const Forum = require('../models/Forum');

router.post('/post', async (req, res) => {
  const { question, category, anonymous } = req.body;
  const forumPost = new Forum({ question, category, anonymous, askedBy: req.user.id });
  await forumPost.save();
  res.json(forumPost);
});

router.get('/posts', async (req, res) => {
  const posts = await Forum.find().populate('askedBy', 'username');
  res.json(posts);
});

module.exports = router;