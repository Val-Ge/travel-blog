const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Adjust the path as necessary
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { ensureAuthenticated, ensureAdmin } = require('../config/auth');
const flash = require('connect-flash');

// Login Page
router.get('/login', (req, res) => res.render('login'));

// Register Page
router.get('/register', (req, res) => res.render('register'));

// Register User
router.post('/register', (req, res) => {
    const { name, email, password, password2, role } = req.body;
    let errors = [];

    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please enter all fields.' });
    }
    if (password !== password2) {
        errors.push({ msg: 'Passwords do not match.' });
    }
    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters.' });
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2,
            role
        });
    } else {
        User.findOne({ email: email }).then(user => {
            if (user) {
               // User already exists, set error message and redirect
               req.flash('error_msg', 'Email already exists.');
               res.redirect('/register');
             
            } else {
                const newUser = new User({
                    name,
                    email,
                    password,
                    role: 'user' //default role set to user
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => {
                                
                                req.flash('success_msg', 'You are now registered and can log in');
                                res.redirect('/login'); // '/users/login'
                    }) 
                            .catch(err => console.log(err));
                    });
                });
            }
        });
    }
});

// Login POST handler
// router.post('/login', (req, res, next) => {
//     passport.authenticate('local', {
//         successRedirect: '/new',
//         failureRedirect: '/login',// '/users/login'
//         failureFlash: true
//     })(req, res, next);
// });

router.post('/login', (req, res, next) => {
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

