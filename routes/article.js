const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Article = require('../models/Article');
const User = require('../models/User')
const Comment = require('../models/Comment');

router.post('/submit', async(req, res) => {
  const user = await User.findOne({user: req.user.name});
  const newArticle = await new Article({
    user: req.user.name,
    title: req.body.title,
    description: req.body.description
  });
  const article = await newArticle.save();
  res.redirect('/main');
});

router.post('/article/:user', async(req, res) => {
  const user = await User.findOne({name: req.user.name});
  const comment = new Comment({
    text: req.body.comment,
    article: req.user.name
  });
  await comment.save();
  const article = await Article.findOne({user: req.params.user});
  article.comments.push(comment);
  await article.save();
  res.redirect(`/article/${article.user}`);
});

router.get('/article/:user', async(req, res) => {
  Article.findOne({user: req.params.user})
        .populate('comments')
        .exec(function(err, result){
          if(err){
            res.send(err);
          }
          res.render('show', {article: result, comments: result.comments});
        });
});

module.exports = router;
