const Spaceflight = require('../models/spaceflight');
const Spacecraft = require('../models/spacecraft');
const Cosmonaut = require('../models/cosmonaut');


// exports.getAllSpaceflightsOld = (req, res, next) => {
//   Spaceflight.find().then(spaceflights => {
//
//     let spacecraftPromises = spaceflights.map((spaceflight) => {
//       return new Promise((resolveSpacecraft) => {
//         // get spacecraft object in database and add it to spaceflight
//         Spacecraft.findOne({_id: spaceflight.spacecraft})
//           .then(result => {
//             spaceflight.spacecraft = result;
//
//             // get cosmonauts and add it to spaceflight
//             let allCosmonautsPromises = (spaceflight.cosmonauts.map((cosmonaut, index) => {
//               return new Promise((resolveCosmonauts) => {
//                 Cosmonaut.findOne({_id: cosmonaut})
//                   .then(result => {
//                     spaceflight.cosmonauts[index] = result;
//                     resolveCosmonauts();
//                   });
//               });
//             }));
//             Promise.all(allCosmonautsPromises).then(() => resolveSpacecraft());
//           });
//       });
//     });
//     Promise.all([...spacecraftPromises]).then(() => {
//       // console.log('done');
//       console.log('what will be send: ' + spaceflights);
//       res.status(200).json({
//         message: 'Spaceflights fetched successfully!',
//         spaceflights: spaceflights
//       });
//     });
//   })
//     .catch(err => {
//       console.log('werasdfwer');
//       res.status(500).json({
//         message: 'Fetching spaceflights failed'
//       });
//     });
// };

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
