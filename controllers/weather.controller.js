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
      Date: item.dt_txt,
      Conditions: item.weather[0].main
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
    await UserService.updateUser(user, result);
    return res.status(200).json({
      cityName: result.cityName,
      date: result.date,
      list: result.weatherList
    });
  } catch (e) {
    res.status(500).json({ message: 'Internal server error' });
  }
}