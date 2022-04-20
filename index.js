const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override');
const authRoute = require('./routes/auth');
const articleRoute = require('./routes/article');
const profileRoute = require('./routes/profile');
const Article = require('./models/Article');
const User = require('./models/User');

const mySecret = process.env['MONGO_URL'];
mongoose.connect(mySecret);

app.set('view engine', 'ejs');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cookieParser());
app.use(flash());
app.use(session({
  secret: "abcd1234",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

app.get('/', async(req, res) => {
  const articles = await Article.find().sort({time: 'desc'});
  res.render('home', {articles: articles});
});

app.get('/submit', async(req, res) => {
  res.render('submit');
});

app.get('/about', async(req, res) => {
  res.render('about');
});

app.get('/main', checkAuthenticated , async(req, res) => {
  const user = await User.findById(req.user.id);
  const articles = await Article.find().sort({time: 'desc'});
  res.render('main', {name: req.user.name, articles: articles, user: user});
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}

app.use('/', articleRoute);
app.use('/auth', authRoute);
app.use('/', profileRoute);

app.delete('/logout', (req, res) => {
  req.logOut();
  res.redirect('/auth/login');
});

app.listen(3000, () => {
  console.log('start');
});
