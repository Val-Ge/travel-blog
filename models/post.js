const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const multer = require('multer');

const commentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});
  
  // Models
  const postSchema = new Schema({
    title: String,
    content: String,
    image: String,
    location: String,
    comments: [commentSchema]
  });

  module.exports = mongoose.model("Post", postSchema)