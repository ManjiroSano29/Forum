const mongoose = require('mongoose');
const { Schema } = mongoose;
const Article = require('../models/Article');
const Comment = require('../models/Comment');
const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  article: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article'
  },
  fullname: String,
  career: String,
  location: String,
});

const User = mongoose.model('User', userSchema);
module.exports = User;
