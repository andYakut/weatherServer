const Weather = require('../models/weather.model');

exports.addWeatherForecast = async (param) => {
  try {
    const result = Weather.create( param );
    return result;
  } catch (e) {
    throw Error(`Can't create a weather forecast ${param.name}`)
  }
}

exports.getWeatherById = async (param) => {
  try {
    const result = Weather.findById(param, 'date cityName weatherList');
    return result;
  } catch(e) {
    throw Error("This weather forecast doesn't exist");
  }
}

exports.findUserWeatherHistory = async (param) => {
  try {
    const result = Weather.find({ owner: param }, 'date cityName');
    return result;
  } catch (e) {
    throw Error("Cann't find this weather forecast");
  }
}