const mongoose = require('mongoose');
const api = require('../apis/api').api;
const WeatherService = require('../services/weather.services');
const UserService = require('../services/user.services');

exports.getWeather = async (req, res) => {
  const user = req.user;

  const response = await api.get('/forecast', {
    params: {
      appid: 'a296ac97ed235ce1bb7927ede91f4b32',
      lat: req.query.lat,
      lon: req.query.lng
    }
  });

  const weatherForecast = response.data;
  const weatherForecastList = weatherForecast.list.map((item, index) => {
    return {
      index: String(index),
      temperature: item.main.temp,
      date: item.dt_txt,
      conditions: item.weather[0].main
    }
  })

  newWeather = {
    owner: user._id,
    date: Date.now(),
    cityName: weatherForecast.city.name,
    weatherList: weatherForecastList
  }

  try {
    const result = await WeatherService.addWeatherForecast(newWeather);
    return res.status(200).json({
      cityName: result.cityName,
      date: result.date,
      list: result.weatherList
    });
  } catch (e) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}

exports.getWeatherHistory = async (req, res) => {
  const user = req.user;

  try {
    const result = await WeatherService.findUserWeatherHistory(user._id);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}