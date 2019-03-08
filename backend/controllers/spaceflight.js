const Spaceflight = require('../models/spaceflight');

exports.getAllSpaceflights = (req, res, next) => {
  Spaceflight.find().then(spaceflights => {
    res.status(200).json({
      message: 'Spaceflights fetched successfully!',
      spaceflights: spaceflights
    });
  })
    .catch(err => {
      res.status(500).json({
        message: 'Fetching spaceflight failed'
      });
    });
};

exports.createSpaceflight = (req, res, next) => {
  const spaceflight = new Spaceflight({
    distance: req.body.distance,
    startTime: req.body.startTime,
    isStarted: false,
    spacecraftId: req.body.spacecraftId,
    cosmonautsIds: req.body.cosmonautsIds
  });
  spaceflight.save().then(() => {
    res.status(201).json({
      spaceflight: spaceflight
    })
  })
    .catch(err => {
      res.status(500).json({
        message: 'Spaceflight was not created'
      });
    });
};

exports.deleteSpaceflight = (req, res, next) => {
  Spaceflight.deleteOne({_id: req.params.id})
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({_id: req.params.id});
      } else {
        res.status(401).json({message: 'Spaceflight doesn\'t exists'});
      }
    })
    .catch(err => {
      res.status(500).json({
        message: 'Deleting spaceflight failed'
      });
    });
};

exports.updateSpaceflight = (req, res, next) => {
  const spaceflight = new Spaceflight({
    _id: req.params.id,
    distance: req.body.distance,
    startTime: req.body.startTime,
    isStarted: false,
    spacecraftId: req.body.spacecraftId,
    cosmonautsIds: req.body.cosmonautsIds
  });
  Spaceflight.updateOne({_id: req.params.id}, spaceflight).then(result => {
    if (result.n > 0) {
      res.status(200).json({spaceflight: spaceflight});
    } else {
      res.status(401).json({message: 'Spaceflight does not exists'});
    }
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'Couldn\'t update spaceflight!'
      });
    });
};
