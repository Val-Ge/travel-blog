const express = require('express');
const router = express.Router();





// View full post route
router.get('/posts/:postId', async (req, res) => {
    const post = await Post.findById(req.params.postId);
    res.render('post', { post });
  });
  
  // Delete route
  router.delete('/posts/:postId', auth, async (req, res) => {
    await Post.findByIdAndDelete(req.params.postId);
    res.redirect('/');
  });

module.exports = router;