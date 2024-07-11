const express = require('express');
const router = express.Router();
const { validateBody } = require('../validationMiddleware');
const User = require('../models/User'); // Adjust the path as necessary
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { registerSchema, loginSchema, commentSchema, postSchema }  = require('../schemas');
const { ensureAuthenticated, ensureAdmin } = require('../config/auth');
const flash = require('connect-flash');

// Login Page
router.get('/login', (req, res) =>  res.render('login'));


// Register Page
router.get('/register', (req, res) => res.render('register'));


// Register User
router.post('/register', validateBody(registerSchema), async (req, res) => {
    const { name, email, password, role } = req.body;
    console.log('Register route hit with data:', req.body);

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('User already exists');
            req.flash('error_msg', 'Email already exists.');
            return res.redirect('/register');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Password hashed successfully');

        // Create a new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: role || 'user' // default role set to user
        });

        // Save the user to the database
        await newUser.save();
        console.log('User registered successfully');

        req.flash('success_msg', 'You are now registered and can log in');
        res.redirect('/login');
    } catch (error) {
        console.error('Error registering user:', error);
        req.flash('error_msg', 'Something went wrong. Please try again later.');
        res.redirect('/register');
    }
});

//login user
router.post('/login', validateBody(loginSchema), async (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        req.flash('error_msg', 'Invalid credentials'); // Set error message
        return res.redirect('/login');
    }
  
      req.logIn(user, (err) => {
        if (err) return next(err);
        if (user.role === 'admin') {
          return res.redirect('/new');
        } else {
          return res.redirect('/');// /dahboard
        }
      });
    })(req, res, next);
  });
 
  

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash('success_msg', 'You are logged out.');
        res.redirect('/login');
    });
});





module.exports = router;

