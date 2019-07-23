let express = require('express'),
    bodyParser = require('body-parser'),
    server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

server.post('/login', (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

const PORT = process.env.port || 3001;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
