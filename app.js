require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const nodemailer = require('nodemailer')

// Load route files
const postRoutes = require('./routes/postRoutes');
const blogRoutes = require('./routes/blogRoutes');
const userRoutes = require('./routes/userRoutes');

// Passport config
require('./config/passport')(passport);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/travelBlog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Set EJS as templating engine
app.set('view engine', 'ejs');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // In case you're sending JSON

// Express session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

//set views directory
app.set('views', path.join(__dirname, 'views'));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables for flash messages and user
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// Routes
app.use('/', blogRoutes);
app.use('/', postRoutes);
app.use('/', userRoutes); // Prefix user routes with /users

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
