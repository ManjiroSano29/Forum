const mongoose = require('mongoose');
const { Schema } = mongoose;
const Article = require('../models/Article');
const Comment = require('../models/Comment');
var passportLocalMongoose=require("passport-local-mongoose");
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
  resetPasswordToken: String,
  resetPasswordExpires: Date
});
var options = {
    errorMessages: {
        MissingPasswordError: 'No password was given',
        AttemptTooSoonError: 'Account is currently locked. Try again later',
        TooManyAttemptsError: 'Account locked due to too many failed login attempts',
        NoSaltValueStoredError: 'Authentication not possible. No salt value stored',
        IncorrectPasswordError: 'Password or username are incorrect',
        IncorrectUsernameError: 'Password or username are incorrect',
        MissingUsernameError: 'No username was given',
        UserExistsError: 'A user with the given username is already registered'
    }
};
userSchema.plugin(passportLocalMongoose, options);
const User = mongoose.model('User', userSchema);
module.exports = User;