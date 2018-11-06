var express = require('express');
var router = express.Router();

var Users = require('../models/users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Your Journal' });
});

router.get('/signup',function(req,res){
  res.render('signup');
})

router.post('/signup',function(req,res){
  var user = new Users({
    username: req.body.username,
    password: req.body.password
  });
  var promise = user.save()
  promise.then((user)=>{
    console.log('User signed up with values',user);
    res.redirect('/index')
  })
});

router.get('/login',function(req,res){
  res.render('login');
})

router.post('/login',function(req, res){
  // console.log('req.......',req.body);
  if (req.body.username && req.body.password){
    Users.find({username: req.body.username, password: req.body.password},function(err, user){
      console.log('logged in user is ...',user);

      
      res.redirect('/');
    })
  }else {
    console.log("Re-enter username and password");
   }
});

router.use(express.static("public"));

module.exports = router;
