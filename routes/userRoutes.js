const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Adjust the path as necessary
const bcrypt = require('bcryptjs');
const { ensureAuthenticated, ensureAdmin } = require('../config/auth');

//login
router.get('/login', (req, res) => 
res.render('login'));

//register
router.get('/register', (req, res) =>
res.render('register'));

//to register
router.post('/register', (req, res) => {
    const { name: email, password, password2, role } = req.body;
    let errors =[];
if(!name || !email || !password || !password2){
    errors.push({msg: 'Please enter all fields.'});
} 
if(password != password2){
    errors.push({msg: 'Passwords do not match.'});
}
if(password.length < 6){
    errors.push({msg: 'Password must be at least 6 characters'});
}
if(errors.length > 0){
    res.render('register', {
        errors,
        name,
        email,
        password,
        password2,
        role
});
} else {
    User.findOne({email: email}).then(user => {
        if(user){
            errors.push({msg: 'Email already exists'});
            res.render('register', {
                errors,
                name,
                email,
                password,
                password2,
                role
            });
        } else {
            const newUser = new User({
                name,
                email,
                password,
                role: role || 'user'
            });
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash( new User.password, salt, (err, hash) => {
                if(err) throw err;
                newUser.password = hash;
                newUser
                .save()
                .then(user => {
                    req.flash('success_msg', 'You are now registered and can log in');
                    res.redirect('/users/login');
                })
                .catch(err => console.log(err));
            });
        });
        }
    });
}
});

//login post
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect:'/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    }) (req, res, next);
})

//logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'you are logged out');
    res.redirect('/users/login');
});

module.exports = router;