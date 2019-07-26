const express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    user = require('./routes/user.routes'),
    api = require('./routes/api.routes'),
    authMiddleware = require('./middlewares/auth.middleware'),
    server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(cors());
// server.use( function(req, res, next) {
//   console.log('req.headers', req.headers)
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Host, Accept, Token, Accept-Language, Referer, Host");
//   next();  
// });

mongoose.connect('mongodb://localhost:27017/weatherForecast', {useNewUrlParser: true}, (err) => {
  if(err) return console.log(err);

  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});

server.use('/auth', user);
server.use('/api', authMiddleware.checkAuth, api);

const PORT = process.env.port || 3001;