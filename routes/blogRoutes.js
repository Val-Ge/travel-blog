const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const Post = require('../models/post'); // Adjust the path as necessary
const { ensureAuthenticated, ensureAdmin } = require('../config/auth');

// Define the Message schema and model
const messageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

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

router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Create a new message instance
  const newMessage = new Message({
      name,
      email,
      message
  });

  try {
      // Save the message to the database
      await newMessage.save();

      // Set up nodemailer
      let transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS
          }
      });

      // Prepare email data
      let mailOptions = {
          from: process.env.EMAIL_USER,
          to: process.env.RECIPIENT_EMAIL,
          subject: 'New Contact Form Submission',
          text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
      };

      // Send email
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              console.error(error);
              res.status(500).send('Error: Failed to send email.');
          } else {
              console.log('Email sent: ' + info.response);
              // res.send('Thank you! Your message has been sent.');
              res.redirect('/')
          }
      });
  } catch (error) {
      console.error(error);
      res.status(500).send('Error: Failed to save message.');
  }
});

module.exports = router;
