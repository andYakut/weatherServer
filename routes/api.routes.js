const express = require('express');
const router = express.Router();

const WeatherController = require('../controllers/weather.controller');

router.get('/weather', WeatherController.getWeather);

module.exports = router;