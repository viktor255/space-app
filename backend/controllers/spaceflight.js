const Spaceflight = require('../models/spaceflight');
const Spacecraft = require('../models/spacecraft');
const Cosmonaut = require('../models/cosmonaut');


// exports.getAllSpaceflights = (req, res, next) => {
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
