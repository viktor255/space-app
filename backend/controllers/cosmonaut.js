const Cosmonaut = require('../models/cosmonaut');

const bcrypt = require('bcrypt');
const User = require('../models/user');
const Token = require('../models/token');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

exports.getAllCosmonauts = (req, res, next) => {
  Cosmonaut.find().then(cosmonauts => {
    res.status(200).json({
      message: 'Cosmonauts fetched successfully!',
      cosmonauts: cosmonauts
    });
  })
    .catch(err => {
      res.status(500).json({
        message: 'Fetching cosmonauts failed'
      });
    });
};

exports.createUser = (req, res, next) => {
  const generatedPassword = crypto.randomBytes(4).toString('hex');
  bcrypt.hash(generatedPassword, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash,
        role: 'cosmonaut'
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
              text:
                'Hello,\n\n'
                + 'Your email was assigned to cosmonaut: ' + req.body.name + '\n\n'
                + 'Your password is: ' + generatedPassword + '\n\n'
                + 'Change your password as soon as possible \n\n'
                + 'Please verify your account by clicking the link: \nhttp:\/\/'
                + req.headers.host + '\/api\/auth\/confirmation\/' + token.token + '.\n'
            };
            transporter.sendMail(mailOptions, function (err) {
              if (err) {
                console.log('error message');
                console.log(err);
                return res.status(500).json({message: err.message});
              }
              // res.status(201).send();
              next();
            });
          });
        })
        .catch(err => {
          res.status(500).json({
            message: 'Given email is already used'
          });
        })
    });
};

exports.createCosmonaut = (req, res, next) => {
  const cosmonaut = new Cosmonaut({
    email: req.body.email,
    name: req.body.name,
    dateOfBirth: req.body.dateOfBirth,
    weight: req.body.weight,
    foodConsumption: req.body.foodConsumption
  });
  cosmonaut.save().then(() => {
    res.status(201).json({
      cosmonaut: cosmonaut
    })
  })
    .catch(err => {
      res.status(500).json({
        message: 'Cosmonaut was not created'
      });
    });
};

exports.updateCosmonaut = (req, res, next) => {
  Cosmonaut.updateOne({_id: req.params.id}, {name: req.body.name, dateOfBirth: req.body.dateOfBirth, weight: req.body.weight, foodConsumption: req.body.foodConsumption})
    .then(result => {
    if (result.n > 0) {
      res.status(200).json({message: 'Cosmonaut updated successfully'});
    } else {
      res.status(401).json({message: 'Cosmonaut does not exists'});
    }
  })
    .catch(err => {
      res.status(500).json({
        message: 'Couldn\'t update cosmonaut!'
      });
    });
};

exports.deleteUser = (req, res, next) => {
  Cosmonaut.findOne({_id: req.params.id})
    .then(result => {
      User.deleteOne({email: result.email})
        .then(result => {
          if (result.n > 0) {
            next();
          } else {
            res.status(401).json({message: 'User doesn\'t exists'});
          }
        })
    })
    .catch(err => {
      res.status(500).json({
        message: 'Couldn\'t find user or cosmonaut to delete!'
      });
    });
};

exports.deleteCosmonaut = (req, res, next) => {
  Cosmonaut.deleteOne({_id: req.params.id})
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({_id: req.params.id});
      } else {
        res.status(401).json({message: 'Cosmonaut doesn\'t exists'});
      }
    })
    .catch(err => {
      res.status(500).json({
        message: 'Deleting cosmonaut failed'
      });
    });
};
