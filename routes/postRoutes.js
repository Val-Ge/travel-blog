const express = require('express');
const router = express.Router();
const upload = require('../uploadConfigs'); // Make sure this path is correct
const Post = require('../models/post'); // Adjust the path as necessary


router.get('/new', (req, res) => {
  res.render('new');
});

router.post('/new', upload.single('image'), async (req, res) => {
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
    res.render('post', { post });
  });
  
  // Delete route
  router.delete('/posts/:postId', async (req, res) => {
    await Post.findByIdAndDelete(req.params.postId);
    res.redirect('/');
  });

module.exports = router;