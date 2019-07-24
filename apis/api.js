const axios = require('axios');

exports.api = axios.create({
  baseURL: 'http://api.openweathermap.org/data/2.5/',
});
