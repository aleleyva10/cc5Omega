var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var user = require('../user');
var bcrypt = require('bcrypt');

router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());


router.post('/', function(req, res) {
  console.log('in register post:', req.body);
  // use bcrypt to generate a salt
  bcrypt.genSalt(12, function(err, salt) {
    if (err) {
      console.log('err:', err);
      res.sendStatus(400);
    } else {
      console.log('salt:', salt);
      bcrypt.hash(req.body.password, salt, function(err, hash) {
        if (err) {
          console.log('hash err:', err);
        } // end error
        else {
          console.log('hash:', hash);
          var newUser = {
            username: req.body.username,
            password: hash
          };
          console.log('saving user', newUser);
          // save newUser to db
          user(newUser).save();
        } // end no error
      }); // end hash
    } // end no error
  }); // end gen salt
  res.sendStatus(201);
}); // end post

module.exports = router;
