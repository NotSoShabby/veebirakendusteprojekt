var express = require('express');
var router = express.Router();

var db = require('../queries');
const sessions = require('client-sessions');
const bodyParser = require('body-parser');
const path = require('path');

router.use(sessions({
  cookieName: 'mySession',
  secret: 'asdasbgjqkrjnkfaf',
  duration: 24*60*60*1000,
  activeDuration: 1000*5*5
}))

router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', function(req, res,next){
  req.mySession.username = req.body.username;
  req.mySession.password = req.body.password;
    res.redirect('/home');
});
router.get('/home', db.getUserInfo);

router.get('/mycourses', db.getAllUsers);

module.exports = router;
