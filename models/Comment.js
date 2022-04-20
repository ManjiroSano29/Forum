const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('../models/User');
const commentSchema = new Schema({
  article: {
    type: mongoose.Schema.Types.String,
    ref: 'Article'
  },
  text: {
    type: String,
    trim: true,
    required: true
  },
  time: {
    type: Date,
    default: Date.now
  }
});
const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;