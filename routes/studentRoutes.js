const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Attendance = require('../models/Attendance');
const Marks = require('../models/Marks');

router.get('/', async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    const ids = students.map((student) => student._id);
    const attendance = await Attendance.aggregate([{ $match: { studentId: { $in: ids } } }, { $group: { _id: '$studentId', total: { $sum: 1 }, present: { $sum: { $cond: [{ $eq: ['$status', 'Present'] }, 1, 0] } } } }]);
    const marks = await Marks.aggregate([{ $match: { studentId: { $in: ids } } }, { $group: { _id: '$studentId', obtained: { $sum: '$marksObtained' }, maximum: { $sum: '$maximumMarks' } } }]);
    const attendanceMap = new Map(attendance.map((item) => [String(item._id), item]));
    const marksMap = new Map(marks.map((item) => [String(item._id), item]));
    res.json(students.map((student) => {
      const a = attendanceMap.get(String(student._id)) || { total: 0, present: 0 };
      const m = marksMap.get(String(student._id)) || { obtained: 0, maximum: 0 };
      return { ...student.toObject(), attendancePercentage: a.total ? Math.round((a.present / a.total) * 100) : 0, marksPercentage: m.maximum ? Math.round((m.obtained / m.maximum) * 100) : 0 };
    }));
  } catch (error) { res.status(500).json({ message: error.message }); }
});

router.post('/', async (req, res) => {
  try { res.status(201).json(await Student.create(req.body)); }
  catch (error) { res.status(400).json({ message: error.code === 11000 ? 'Student ID already exists' : error.message }); }
});

router.delete('/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    await Promise.all([Attendance.deleteMany({ studentId: student._id }), Marks.deleteMany({ studentId: student._id })]);
    res.json({ message: 'Student deleted' });
  } catch (error) { res.status(500).json({ message: error.message }); }
});

module.exports = router;
