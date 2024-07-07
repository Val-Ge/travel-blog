const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

//load user model
const User = require('../models/User');

module.exports = function(passport){
    passport.use(
        new LocalStrategy({ usernameField: 'email'}, (email, password, done) => {
            //match user
            User.findOne({
                email: email}).then (user => {
                    if (!user){
                        return done(null, flase, { message: "That email is not registered"});
                    }

            //match password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if(err) throw err;
                if(isMatch){
                    return done(null, user);
                } else {
                    return done( null, false, { message: 'Password is incorrect'});
                }
            });
        });
     })
);
        passport.deserializeUser((id, done) => {
            User.finfById(id, (err, user)=> {
                done (err, user);
            });
        });
    };
