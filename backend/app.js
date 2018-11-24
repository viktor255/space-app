const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Spacecraft = require('./models/spacecraft');

const app = express();

mongoose.connect('mongodb+srv://space-app:gppg8SmyZDMr6fsn@space-eapuo.mongodb.net/space-app?retryWrites=true', {useNewUrlParser: true})
  .then(() => console.log('Connected to database.'))
  .catch(e => console.log('Connection failed', e));

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.post('/api/spacecrafts', (req, res, next) => {
  const spacecraft = new Spacecraft({
    name: req.body.name,
    numberOfSeats: req.body.numberOfSeats,
    fuelTankCapacity: req.body.fuelTankCapacity,
    fuel: req.body.fuel,
    fuelConsumption: req.body.fuelConsumption,
    speed: req.body.speed,
    maximumLoad: req.body.maximumLoad,
    foodBoxCapacity: req.body.foodBoxCapacity
  });
  spacecraft.save();
  res.status(201).json({
    spacecraft: spacecraft
  });

});

app.get('/api/spacecrafts', (req, res, next) => {
  Spacecraft.find().then(spacecrafts => {
    res.status(200).json({
      message: 'Spacecrats fetched succsesfully!',
      spacecrafts: spacecrafts
    });
  });
});

app.delete('/api/spacecrafts/:id', (req, res, next) => {
  Spacecraft.deleteOne({_id: req.params.id})
    .then(result => {
      res.status(200).json({_id: req.params.id});
    })
});


module.exports = app;
