require('dotenv').config();

const express = require('express');
const app = express();
const multer = require('multer');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Post = require('./models/post')
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
// const methodOverride = require('method-override');

const postRoutes = require('./routes/postRoutes');
const blogRoutes = require('./routes/blogRoutes');
const userRoutes = require('./routes/userRoutes');

//passport config
require('./config/passport')(passport)

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/travelBlog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Set EJS as templating engine
app.set('view engine', 'ejs');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // In case you're sending JSON

//express session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
// app.use(methodOverride('_method'));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());

//global variables
app.use((req, res, next) =>{
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = res.user || null;
  next();
});


app.use('/', blogRoutes);
app.use('/', postRoutes);
app.use('/', userRoutes);





// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
