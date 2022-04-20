const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/profile/:name', async(req, res) => {
  const users = await User.find();
  const user = await User.findOne({name: req.params.name});
  res.render('profile', {name: req.user.name,
                        fullname: req.user.fullname,
                        career: req.user.career,
                        location: req.user.location,
                        user: user});
});

router.get('/profile/edit/:name', async(req, res) => {
  const user = await User.findOne({name: req.params.name});
  res.render('profile-edit', {user: user});
});

router.post('/profile/edit/:name', async(req, res) =>{
  const user = await User.findOne({name: req.params.name});
  const update = {
   fullname: req.body.fullname,
   career: req.body.career,
   location: req.body.location
  }
  const filter = {name: req.params.name}
  const updatedDocument = await User.findOneAndUpdate(filter, update, { new: true });
  res.redirect(`/profile/${user.name}`);
});

router.get('/:name', async(req, res) => {
  const user =  await User.findOne({name: req.params.name});
  res.render('people', {user: user});
});


module.exports = router;