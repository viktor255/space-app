const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const spacecraftsRoutes = require('./routes/spacecraft');
const cosmonautsRoutes = require('./routes/cosmonaut');
const spaceflightsRoutes = require('./routes/spaceflight');
const userRoutes = require('./routes/user');

mongoose.connect(
  'mongodb+srv://space-app:' +
  process.env.MONGO_ATLAS_PW +
  '@space-eapuo.mongodb.net/space-app?retryWrites=true', {useNewUrlParser: true})
  .then(() => console.log('Connected to database.'))
  .catch(e => console.log('Connection failed', e));

app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, 'angular')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  next();
});

app.use('/api/spacecrafts', spacecraftsRoutes);
app.use('/api/cosmonauts', cosmonautsRoutes);
app.use('/api/spaceflights', spaceflightsRoutes);
app.use('/api/auth', userRoutes);
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'angular', 'index.html'));
});

module.exports = app;
