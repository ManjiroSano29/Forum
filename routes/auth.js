const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const articleRoute = require('../routes/article');
const Article = require('../models/Article');
const User = require('../models/User');
const jwtSecret = process.env['JWT_SECRET'];

router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/login', (req, res) => {
  res.render('login');
});

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
         done(err, user);
    });
});

passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passReqToCallback: true 
}, (req, email, password, done) => {
   process.nextTick(function () {
     User.findOne({'email': email}, async(err, user) => {
       if(err){
         return done(err);
       }
       if(user){
         return done(null, false, {message: 'That email is already taken'});
       }else{
         const salt = await bcrypt.genSalt(saltRounds);
         const hashed = await bcrypt.hash(req.body.password, salt);
         const newUser = new User({
           name: req.body.name,
           email: req.body.email,
           password: hashed
         });
         newUser.save((err) => {
           if(err) throw err;
           return done(null, newUser);
          });
      }
    });
  });
}));

router.post('/register', passport.authenticate('local-signup', { 
  failureRedirect: '/auth/register',
  failureFlash: true
}), (req, res) => {
  res.redirect('/auth/login');
});

passport.use('local-login', new LocalStrategy({
  usernameField: 'email'
},(email, password, done) => {
   User.findOne({email: email}, async function(err, user){
    if (err) {
      return done(err);
    }

    if (!user) { 
      return done(null, false, {message: 'Email not found'}); 
    }
      
    if (await bcrypt.compare(password, user.password)) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Password incorrect' });
      }
    });
  }));

router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/main',
  failureRedirect: '/auth/login',
  failureFlash: true
}))

module.exports = router;