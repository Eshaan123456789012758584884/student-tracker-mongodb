const express = require('express');
const router = express.Router();
const Marks = require('../models/Marks');

router.get('/', async (_req, res) => res.json(await Marks.find().populate('studentId', 'name studentId').sort({ createdAt: -1 })));
router.post('/', async (req, res) => {
  try { res.status(201).json(await Marks.create(req.body)); }
  catch (error) { res.status(400).json({ message: error.message }); }
});
module.exports = router;
