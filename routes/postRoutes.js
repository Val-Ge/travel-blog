const express = require('express');
const router = express.Router();
const upload = require('../uploadConfigs'); // Ensure this path is correct
const Post = require('../models/post'); // Adjust the path as necessary
const Comment = require('../models/comment'); // Ensure this path is correct
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const { ensureAuthenticated, ensureAdmin } = require('../config/auth');

router.use(require('method-override')('_method'));

// New post form route
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
      comments:[]
    });
    await post.save();
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// View full post route with comments
router.get('/posts/:postId', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId).populate({
      path: 'comments',
      populate: {
        path: 'user',
        model: 'User'
      }
    });

    if (!post) {
      return res.status(404).send('Post not found');
    }
    console.log("Post:", post); // Debugging
    console.log("Comments:", post.comments); // Debugging

    const admin = req.isAuthenticated() && req.user.role === 'admin';
    res.render('post', { post, admin });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Handle comment submission
router.post('/posts/:postId/comments', ensureAuthenticated, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).send('Post not found');
    }
    console.log("Request User:", req.user); // Debugging
    console.log("Request Body:", req.body); // Debugging

    const newComment = new Comment({
      user: req.user._id,
      content: req.body.content
    });

    await newComment.save();
    post.comments.push(newComment);
    await post.save();

    res.redirect(`/posts/${post._id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Edit post form route
router.get('/posts/:postId/edit', ensureAuthenticated, ensureAdmin, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).send('Post not found');
    }

    const admin = req.isAuthenticated() && req.user.role === 'admin';
    res.render('edit', { post, admin });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Handle edit post form submission
router.put('/posts/:postId', ensureAuthenticated, ensureAdmin, upload.single('image'), async (req, res) => {
  try {
    const { title, content, location } = req.body.post;
    const updateData = { title, content, location };

    // If a new image is uploaded, include it in the update
    if (req.file) {
      updateData.image = req.file.filename;
    }

    await Post.findByIdAndUpdate(req.params.postId, updateData);
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
