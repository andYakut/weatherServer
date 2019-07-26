const express = require('express');
const router = express.Router();

const WeatherController = require('../controllers/weather.controller');

router.get('/weather', WeatherController.getWeather);
router.get('/history', WeatherController.getWeatherHistory);

module.exports = router;