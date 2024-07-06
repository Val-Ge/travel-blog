const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// const path = require('path');
// const methodOverride = require('method-override');

const postRoutes = require('./routes/postRoutes');
const blogRoutes = require('./routes/blogRoutes');

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
app.use(express.static('public'));
// app.use(methodOverride('_method'));

app.use('/', blogRoutes);
app.use('/', postRoutes);


// Routes
app.get('/', async (req, res) => {
  const posts = await Post.find();
  res.render('index', { posts });
});


// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
