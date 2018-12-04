const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Token = require('../models/token');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const router = express.Router();

router.post('/signup', (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(result => {
          console.log('User created');
          // console.log(result);

          // Create a verification token for this user
          var token = new Token({_userId: user._id, token: crypto.randomBytes(16).toString('hex')});

          // Save the verification token
          token.save(function (err) {
            if (err) {
              console.log('error token');
              return res.status(500).json({error: err.message});
            }

            // Send the email
            var transporter = nodemailer.createTransport({
              host: 'smtp.sendgrid.net',
              port: 587,
              secure: false,
              auth: {
                user: 'apikey',
                pass: 'dummy'
              }
            });

            var mailOptions = {
              from: 'no-reply@space-app.cz',
              to: user.email,
              subject: 'Space-app: Account Verification Token',
              text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/'
                + req.headers.host + '\/api\/auth\/confirmation\/' + token.token + '.\n'
            };
            transporter.sendMail(mailOptions, function (err) {
              if (err) {
                console.log('error message');
                console.log(err);
                return res.status(500).json({error: err.message});
              }
              res.status(201).send();
            });
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        })
    });
});

router.post('/login', (req, res, next) => {
  let fetchedUser;
  User.findOne({email: req.body.email})
    .then(user => {
      if (!user) {
        return res.status(401).json({message: 'Invalid email of password1'});
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({message: 'Invalid email of password2'});
      }
      if (!fetchedUser.isVerified) {
        return res.status(401).json({message: 'User is not verified'});
      }
      const token = jwt.sign({
        email: fetchedUser.email,
        userId: fetchedUser._id
      }, 'secret_should_be_longer', {expiresIn: '1h'});
      // console.log(fetchedUser);
      res.status(200).json({
        user: {
          email: fetchedUser.email,
          token: token,
          role: fetchedUser.role,
          expiresIn: Date.now() + 3600 * 1000
        }
      });

    })
    .catch(err => {
      return res.status(401).json({err: err});
    });
});

router.get('/confirmation/:token', (req, res, next) => {

  // Check for validation errors
  // var errors = req.validationErrors();
  // if (errors) return res.status(400).send(errors);

  // Find a matching token
  Token.findOne({token: req.params.token}, function (err, token) {
    if (!token) return res.status(400).send({
      type: 'not-verified',
      msg: 'We were unable to find a valid token. Your token my have expired.'
    });

    // If we found a token, find a matching user
    User.findOne({_id: token._userId}, function (err, user) {
      if (!user) return res.status(400).send({msg: 'We were unable to find a user for this token.'});
      if (user.isVerified) return res.status(400).send({
        type: 'already-verified',
        msg: 'This user has already been verified.'
      });

      // Verify and save the user
      user.isVerified = true;
      user.save(function (err) {
        if (err) {
          return res.status(500).send({msg: err.message});
        }
        res.status(200).send("The account has been verified. Please log in.");
      });
    });
  });

});
router.post('/resend', (req, res, next) => {
});

module.exports = router;
