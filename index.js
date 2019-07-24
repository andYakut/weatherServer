const express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    user = require('./routes/user.routes'),
    weather = require('./routes/weather.routes'),
    server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

mongoose.connect('mongodb://localhost:27017/weatherForecast', {useNewUrlParser: true}, (err) => {
  if(err) return console.log(err);

  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});

server.use('/user', user);
server.use('/weather', weather);

const PORT = process.env.port || 3001;