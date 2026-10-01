const mongoose = require('mongoose');

const marksSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  subject: { type: String, required: true, trim: true },
  exam: { type: String, required: true, trim: true },
  marksObtained: { type: Number, min: 0, required: true },
  maximumMarks: { type: Number, min: 1, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Marks', marksSchema);
