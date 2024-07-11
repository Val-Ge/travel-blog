require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');

const app = express();



// Import models
const User = require('./models/User'); // Adjust path as necessary
const Comment = require('./models/comment'); // Adjust path as necessary
const Post = require('./models/post'); // Adjust path as necessary


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
app.use(methodOverride('_method'));

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
