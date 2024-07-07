const express = require('express');
const router = express.Router();
const Post = require('../models/post')
const User = require('../models/User')
const { ensureAuthenticated, ensureAdmin } = require('../config/auth');


// Routes
router.get('/', async (req, res) => {
  const posts = await Post.find();
  res.render('index', { posts });
});

router.get('/about', (req, res) => {
    res.render('about');
  });
  
router.get('/contact', (req, res) => {
    res.render('contact');
  });

//dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => 
  res.render('/dashboard', {
    user:req.user
  })
);

//new post - admin only
router.get('/new', ensureAuthenticated, ensureAdmin, (req, res) => 
res.render('new')
);


  
module.exports = router;