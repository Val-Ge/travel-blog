const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Comment = require('./comment'); // Import the Comment model
const User = require('./User'); // Adjust the path as necessary


const postSchema = new Schema({
    title: String,
    content: String,
    image: String,
    location: String,
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment', default: [] }] // Use ObjectId type referencing Comment model
});

module.exports = mongoose.model("Post", postSchema);

  