const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const multer = require('multer');


  
  // Models
  const postSchema = new Schema({
    title: String,
    content: String,
    image: String,
    location: String,
  });

  module.exports = mongoose.model("Post", postSchema)