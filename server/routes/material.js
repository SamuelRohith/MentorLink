const express = require('express');
const router = express.Router();
const Material = require('../models/Material');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

router.get('/materials', async (req, res) => {
  const materials = await Material.find({ status: 'D' }).populate('uploadedBy', 'username');
  res.json(materials);
});

router.post('/upload', upload.single('image'), async (req, res) => {
  const { title, tags } = req.body;
  const user = req.body.user || { _id: 'guest' };
  const material = new Material({ title, tags: tags.split(',').map(tag => tag.trim()), url: `/uploads/${req.file.filename}`, uploadedBy: user._id });
  await material.save();
  res.json(material);
});

router.put('/material/:id/approve', async (req, res) => {
  const material = await Material.findById(req.params.id);
  if (material) {
    material.status = 'D';
    await material.save();
    res.json({ msg: 'Material approved' });
  } else {
    res.status(404).json({ msg: 'Material not found' });
  }
});

router.delete('/material/:id', async (req, res) => {
  await Material.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Material deleted' });
});

module.exports = router;