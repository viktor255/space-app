const express = require('express');

const Spacecraft = require('../models/spacecraft');

const router = express.Router();

router.post('', (req, res, next) => {
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

router.put('/:id', (req, res, next) => {
  const spacecraft = new Spacecraft({
    _id: req.body._id,
    name: req.body.name,
    numberOfSeats: req.body.numberOfSeats,
    fuelTankCapacity: req.body.fuelTankCapacity,
    fuel: req.body.fuel,
    fuelConsumption: req.body.fuelConsumption,
    speed: req.body.speed,
    maximumLoad: req.body.maximumLoad,
    foodBoxCapacity: req.body.foodBoxCapacity
  });
  Spacecraft.update({_id: req.params.id}, spacecraft).then(result => {
    res.status(200).json({
      spacecraft: spacecraft
    });
  })
});

router.get('', (req, res, next) => {
  Spacecraft.find().then(spacecrafts => {
    res.status(200).json({
      message: 'Spacecrats fetched succsesfully!',
      spacecrafts: spacecrafts
    });
  });
});

router.delete('/:id', (req, res, next) => {
  Spacecraft.deleteOne({_id: req.params.id})
    .then(result => {
      res.status(200).json({_id: req.params.id});
    })
});

module.exports = router;
