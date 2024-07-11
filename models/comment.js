const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User'); // Adjust the path as necessary


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
    },
    parentComment: { 
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        default: null
    },
    childComments: [{ 
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});

module.exports = mongoose.model("Comment", commentSchema);

