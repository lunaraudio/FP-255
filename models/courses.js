const express = require('express');
const router = express.Router();
const Course = require('../models/course');
const User = require('../models/user');

// Create a new course (teachers only)
router.post('/create', async (req, res) => {
  if (req.session.role !== 'teacher') return res.send('Unauthorized');
  
  const { name, description, subject, credits } = req.body;
  const newCourse = new Course({
    name,
    description,
    subject,
    credits,
    teacherId: req.session.userId,
  });
  await newCourse.save();
  res.redirect('/teachers/courses');
});

// Delete a course (only the teacher who created it)
router.post('/delete/:id', async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (course.teacherId.toString() !== req.session.userId.toString()) {
    return res.send('Unauthorized');
  }
  await Course.findByIdAndDelete(req.params.id);
  res.redirect('/teachers/courses');
});

module.exports = router;
