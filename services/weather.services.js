const Weather = require('../models/weather.model');

exports.addWeatherForecast = async (param) => {
  try {
    const result = Weather.create( param );
    return result;
  } catch (e) {
    throw Error(`Can't create a weather forecast ${param.name}`)
  }
}