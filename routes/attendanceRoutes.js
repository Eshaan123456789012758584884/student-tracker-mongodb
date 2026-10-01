const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');

router.get('/', async (_req, res) => res.json(await Attendance.find().populate('studentId', 'name studentId').sort({ date: -1 })));
router.post('/', async (req, res) => {
  try { res.status(201).json(await Attendance.findOneAndUpdate({ studentId: req.body.studentId, date: new Date(req.body.date) }, req.body, { new: true, upsert: true, runValidators: true })); }
  catch (error) { res.status(400).json({ message: error.message }); }
});
module.exports = router;
