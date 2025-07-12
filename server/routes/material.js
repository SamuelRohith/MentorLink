const express = require('express');
const router = express.Router();
const Material = require('../models/Material');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

router.post('/upload', upload.single('image'), async (req, res) => {
  const { title, tags } = req.body;
  const material = new Material({ title, type: 'image', url: `/uploads/${req.file.filename}`, tags, uploadedBy: req.user.id });
  await material.save();
  res.json(material);
});

router.get('/materials', async (req, res) => {
  const materials = await Material.find().populate('uploadedBy', 'username');
  res.json(materials);
});

module.exports = router;