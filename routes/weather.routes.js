const express = require('express');
const router = express.Router();

const WeatherController = require('../controllers/weather.controller');

router.get('/', WeatherController.getWeather);

module.exports = router;