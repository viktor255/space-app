const express = require('express');

const app = express();

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

app.use('/api/spacecrafts', (req, res, next) => {
  const spacecrafts = [
    {
      id: "asdfdsf",
      name: "Enterprise",
      numberOfSeats: 3,
      fuelTankCapacity: 3000,
      fuel: 0,
      fuelConsumption: 1,
      speed: 42,
      maximumLoad: 500,
      foodBoxCapacity: 320
    },
    {
      id: "lkdfgio",
      name: "Determination",
      numberOfSeats: 1,
      fuelTankCapacity: 3000,
      fuel: 0,
      fuelConsumption: 10,
      speed: 420,
      maximumLoad: 500,
      foodBoxCapacity: 320
    }
  ];
  res.status(200).json({
    message: 'Spacecrats fetched succsesfully!',
    spacecrafts: spacecrafts
  });
});


module.exports = app;
