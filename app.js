const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const methodOverride = require('method-override');
const Post = require('./models/post');

const app = express();

const postRoutes = require('./routes/posts');
const blogRoutes = require('./routes/blog');

// Set up storage for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/travelBlog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Set EJS as templating engine
app.set('view engine', 'ejs');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));

// Routes
app.get('/', async (req, res) => {
  const posts = await Post.find();
  res.render('index', { posts });
});

app.get('/new', (req, res) => {
  res.render('new');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.post('/new', upload.single('image'), async (req, res) => {
  try {
    const post = new Post({
      title: req.body.post.title,
      content: req.body.post.content,
      image: req.file.filename,
      location: req.body.post.location,
    });
    await post.save();
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
