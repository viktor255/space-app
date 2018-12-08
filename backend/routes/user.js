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

          // Create a verification token for this user
          const token = new Token({_userId: user._id, token: crypto.randomBytes(16).toString('hex')});

          // Save the verification token
          token.save(function (err) {
            if (err) {
              console.log('error token');
              return res.status(500).json({message: err.message});
            }

            // Send the email
            const transporter = nodemailer.createTransport({
              host: 'smtp.sendgrid.net',
              port: 587,
              secure: false,
              auth: {
                user: 'apikey',
                pass: process.env.SENDGRID_PW
              }
            });

            const mailOptions = {
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
                return res.status(500).json({message: err.message});
              }
              res.status(201).send();
            });
          });
        })
        .catch(err => {
          res.status(500).json({
            message: 'Given email is already used'
          });
        })
    });
});

router.post('/login', (req, res, next) => {
  let fetchedUser;
  User.findOne({email: req.body.email})
    .then(user => {
      if (!user) {
        return res.status(401).json({message: 'Invalid authentication credentials'});
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({message: 'Invalid authentication credentials'});
      }
      if (!fetchedUser.isVerified) {
        return res.status(401).json({message: 'User is not verified'});
      }
      const token = jwt.sign({
        email: fetchedUser.email,
        userId: fetchedUser._id
      }, process.env.JWT_KEY, {expiresIn: '1h'});
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
      return res.status(401).json({message: err.message});
    });
});

router.get('/confirmation/:token', (req, res, next) => {

  // Check for validation errors
  // var errors = req.validationErrors();
  // if (errors) return res.status(400).send(errors);

  // Find a matching token
  Token.findOne({token: req.params.token}, function (err, token) {
    if (!token) return res.status(400).send({msg: 'We were unable to find a valid token. Your token my have expired.'});

    // If we found a token, find a matching user
    User.findOne({_id: token._userId}, function (err, user) {
      if (!user) return res.status(400).send({message: 'We were unable to find a user for this token.'});
      if (user.isVerified) return res.status(400).send({message: 'This user has already been verified.'});

      // Verify and save the user
      user.isVerified = true;
      user.save(function (err) {
        if (err) return res.status(500).send({message: err.message});
        // Delete verification token
        Token.deleteOne({_id: token._id}, function (err) {
        });

        res.status(200).send("The account has been verified. Please log in.");
      });
    });
  });

});

router.post('/resend', (req, res, next) => {


  User.findOne({email: req.body.email}, function (err, user) {
    if (!user) return res.status(400).send({message: 'We were unable to find a user with that email.'});
    if (user.isVerified) return res.status(400).send({message: 'This account has already been verified. Please log in.'});

    // Create a verification token, save it, and send email
    const token = new Token({_userId: user._id, token: crypto.randomBytes(16).toString('hex')});

    // Save the token
    token.save(function (err) {
      if (err) {
        console.log('error token');
        return res.status(500).json({message: err.message});
      }

      // Send the email
      const transporter = nodemailer.createTransport({
        host: 'smtp.sendgrid.net',
        port: 587,
        secure: false,
        auth: {
          user: 'apikey',
          pass: process.env.SENDGRID_PW
        }
      });

      const mailOptions = {
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
          return res.status(500).json({message: err.message});
        }
        res.status(201).send();
      });
    });

  });

});

router.post('/changePassword', (req, res, next) => {

  Token.findOne({token: req.body.token})
    .then(token => {
      if (!token) return res.status(400).send({message: 'We were unable to find a request token.'});

      bcrypt.hash(req.body.password, 10)
        .then(hash => {
          User.updateOne({_id: token._userId}, {$set: {password: hash}})
            .then(response => {
              Token.deleteOne({_id: token._id}, function (err) {
              });
              res.status(200).json({message: 'Password changed'});

            })
            .catch(err => {
              return res.status(401).json({message: err.message});
            });
        });
    })
    .catch(err => {
      return res.status(401).json({message: err.message});
    });
});

router.post('/sendResetPasswordToken', (req, res, next) => {

  User.findOne({email: req.body.email})
    .then(user => {
      if (!user) return res.status(401).json({message: 'User with given email doesn\'t exists'});

      // Create a verification token, save it, and send email
      const token = new Token({_userId: user._id, token: crypto.randomBytes(16).toString('hex')});

      // Save the token
      token.save(function (err) {
        if (err) {
          console.log('error token');
          return res.status(500).json({message: err.message});
        }

        // Send the email
        const transporter = nodemailer.createTransport({
          host: 'smtp.sendgrid.net',
          port: 587,
          secure: false,
          auth: {
            user: 'apikey',
            pass: process.env.SENDGRID_PW
          }
        });

        const mailOptions = {
          from: 'no-reply@space-app.cz',
          to: user.email,
          subject: 'Space-app: Reset password verification token',
          text: 'Hello,\n\n' + 'Please change your password on the link: \n'
            + req.headers.origin + '\/password-reset\/' + token.token + '.\n'
        };
        console.log(mailOptions.text);
        transporter.sendMail(mailOptions, function (err) {
          if (err) {
            console.log('error message');
            console.log(err);
            return res.status(500).json({message: err.message});
          }
        });
        res.status(200).json({message: 'Email with instructions send'})
      });
    });
});

module.exports = router;
