const express = require('express');
const router = express.Router();
const methodOverride = require('method-override');
const upload = require('../uploadConfigs'); // Make sure this path is correct
const Post = require('../models/post'); // Adjust the path as necessary
const { ensureAuthenticated, ensureAdmin } = require('../config/auth');

// //Ensure admin middleware function
// const ensureAdmin = (req, res, next) => {
//   if (req.isAuthenticated() && req.user.isAdmin) {
//     return next(); // User is admin, continue to next middleware/route handler
//   } else {
//     res.status(403).send('Forbidden'); // User is not admin, deny access
//   }
// };
router.use(methodOverride('_method'));
//new post form route
router.get('/new', ensureAuthenticated, ensureAdmin, (req, res) => {
  res.render('new');
});

router.post('/new', ensureAuthenticated, ensureAdmin, upload.single('image'), async (req, res) => {
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

// View full post route
router.get('/posts/:postId', async (req, res) => {
    const post = await Post.findById(req.params.postId);
     // Check if user is admin
     const admin = req.isAuthenticated() && req.user.role === 'admin';
    res.render('post', { post, admin });
  });
  
  // // Delete route
  // router.delete('/posts/:postId', async (req, res) => {
  //   await Post.findByIdAndDelete(req.params.postId);
  //   res.redirect('/');
  // });

  // Edit post form route
router.get('/posts/:postId/edit', ensureAuthenticated, ensureAdmin, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.render('edit', { post, admin });
  } catch (err) {
    console.error(err);
    res.status(404).send('Post not found');
  }
});

// Handle edit post form submission
router.put('/posts/:postId', ensureAuthenticated, ensureAdmin, async (req, res) => {
  try {
    const { title, content, location } = req.body.post;
    await Post.findByIdAndUpdate(req.params.postId, { title, content, location });
    res.redirect(`/posts/${req.params.postId}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Delete route
router.delete('/posts/:postId', ensureAuthenticated, ensureAdmin, async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});
module.exports = router;