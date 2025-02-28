const express = require('express');
const router = express.Router();
const Course = require('../models/course');
const User = require('../models/user');

// Student adds a course
router.post('/add/:courseId', async (req, res) => {
  const student = await User.findById(req.session.userId);
  if (student.role !== 'student') return res.send('Unauthorized');
  
  // Add course to student's schedule (e.g., in a "schedule" array)
  student.schedule.push(req.params.courseId);
  await student.save();
  res.redirect('/students/schedule');
});

// Student drops a course
router.post('/drop/:courseId', async (req, res) => {
  const student = await User.findById(req.session.userId);
  if (student.role !== 'student') return res.send('Unauthorized');
  
  student.schedule = student.schedule.filter(id => id.toString() !== req.params.courseId);
  await student.save();
  res.redirect('/students/schedule');
});

module.exports = router;
