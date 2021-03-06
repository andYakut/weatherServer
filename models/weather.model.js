const mongoose = require('mongoose');

const WeatherHistorySchema = new mongoose.Schema({
  owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  date: {type: Date, default: Date.now},
  cityName: String,
  weatherList: [{
    index: String,
    temperature: Number,
    date: String,
    conditions: String,
  }]
});

const WeatherHistory = mongoose.model('WeatherHistory', WeatherHistorySchema);

module.exports = WeatherHistory;