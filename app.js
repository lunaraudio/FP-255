const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');
const studentRoutes = require('./routes/student');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Session configuration
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));

// Routes
app.use('/auth', authRoutes);
app.use('/teachers', courseRoutes);
app.use('/students', studentRoutes);

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/college', { useNewUrlParser: true, useUnifiedTopology: true });

// Start server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
