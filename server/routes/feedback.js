const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

router.post('/submit', async (req, res) => {
  const { mentorId, rating, comment } = req.body;
  const feedback = new Feedback({ mentorId, studentId: req.user.id, rating, comment });
  await feedback.save();
  res.json(feedback);
});

module.exports = router;