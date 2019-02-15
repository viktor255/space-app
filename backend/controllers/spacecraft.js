const Spacecraft = require('../models/spacecraft');

exports.createSpacecraft = (req, res, next) => {
  const spacecraft = new Spacecraft({
    name: req.body.name,
    numberOfSeats: req.body.numberOfSeats,
    fuelTankCapacity: req.body.fuelTankCapacity,
    fuel: req.body.fuel,
    fuelConsumption: req.body.fuelConsumption,
    speed: req.body.speed,
    maximumLoad: req.body.maximumLoad,
    foodBoxCapacity: req.body.foodBoxCapacity,
    food: req.body.food
  });
  spacecraft.save().then(() => {
    res.status(201).json({
      spacecraft: spacecraft
    })
  })
    .catch(err => {
      res.status(500).json({
        message: 'Spacecraft was not created'
      });
    });
};

exports.updateSpacecraft = (req, res, next) => {
  const spacecraft = new Spacecraft({
    _id: req.body._id,
    name: req.body.name,
    numberOfSeats: req.body.numberOfSeats,
    fuelTankCapacity: req.body.fuelTankCapacity,
    fuel: req.body.fuel,
    fuelConsumption: req.body.fuelConsumption,
    speed: req.body.speed,
    maximumLoad: req.body.maximumLoad,
    foodBoxCapacity: req.body.foodBoxCapacity,
    food: req.body.food
  });
  Spacecraft.updateOne({_id: req.params.id}, spacecraft).then(result => {
    if (result.n > 0) {
      res.status(200).json({spacecraft: spacecraft});
    } else {
      res.status(401).json({message: 'Spacecraft does not exists'});
    }
  })
    .catch(err => {
      res.status(500).json({
        message: 'Couldn\'t update spacecraft!'
      });
    });
};

exports.getAllSpacecrafts = (req, res, next) => {
  Spacecraft.find().then(spacecrafts => {
    res.status(200).json({
      message: 'Spacecrats fetched successfully!',
      spacecrafts: spacecrafts
    });
  })
    .catch(err => {
      res.status(500).json({
        message: 'Fetching spacecraft failed'
      });
    });
};

exports.deleteSpacecraft = (req, res, next) => {
  Spacecraft.deleteOne({_id: req.params.id})
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({_id: req.params.id});
      } else {
        res.status(401).json({message: 'Spacecraft doesn\'t exists'});
      }
    })
    .catch(err => {
      res.status(500).json({
        message: 'Deleting spacecraft failed'
      });
    });
};
