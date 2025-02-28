const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: String,
  description: String,
  subject: String,
  credits: Number,
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
