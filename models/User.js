const mongoose = require('mongoose');
const { Schema } = mongoose;
const Article = require('../models/Article');
const Comment = require('../models/Comment');
const userSchema = new Schema({
  name: {
    type: String,
    
  },
  email: {
    type: String,
    
  },
  password: {
    type: String,
    
  },
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
