const mongoose = require('mongoose');
const { Schema } = mongoose;
const Comment = require('../models/Comment');
const User = require('../models/User');
const articleSchema = new Schema({
  user: String,
  title: String,
  description: String,
  time: {
    type: Date,
    default: Date.now
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }] 
});
const Article = mongoose.model('Article', articleSchema);
module.exports = Article;
