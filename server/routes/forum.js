const express = require('express');
const router = express.Router();
const Query = require('../models/Query');

router.get('/posts', async (req, res) => {
  const queries = await Query.find({ status: 'A' }).populate('askedBy', 'username');
  res.json(queries);
});

router.post('/post', async (req, res) => {
  const { question, category, anonymous } = req.body;
  const user = req.body.user || { _id: 'guest' }; // Fallback for non-auth
  const query = new Query({ question, category, anonymous, askedBy: user._id });
  await query.save();
  res.json(query);
});

router.put('/query/:id/approve', async (req, res) => {
  const query = await Query.findById(req.params.id);
  if (query) {
    query.status = 'A';
    await query.save();
    res.json({ msg: 'Query approved' });
  } else {
    res.status(404).json({ msg: 'Query not found' });
  }
});

router.put('/query/:id/resolve', async (req, res) => {
  const query = await Query.findById(req.params.id);
  if (query) {
    query.status = 'R';
    await query.save();
    res.json({ msg: 'Query resolved' });
  } else {
    res.status(404).json({ msg: 'Query not found' });
  }
});

router.delete('/query/:id', async (req, res) => {
  await Query.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Query deleted' });
});

router.post('/query/:id/reply', async (req, res) => {
  const { text } = req.body;
  const user = req.body.user || { username: 'guest' };
  const query = await Query.findById(req.params.id);
  if (query) {
    query.replies.push({ text, username: user.username });
    await query.save();
    res.json(query);
  } else {
    res.status(404).json({ msg: 'Query not found' });
  }
});

router.delete('/query/:id/reply/:replyIndex', async (req, res) => {
  const query = await Query.findById(req.params.id);
  if (query && query.replies[req.params.replyIndex]) {
    query.replies.splice(req.params.replyIndex, 1);
    await query.save();
    res.json({ msg: 'Reply deleted' });
  } else {
    res.status(404).json({ msg: 'Reply not found' });
  }
});

module.exports = router;