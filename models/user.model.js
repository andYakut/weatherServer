const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: String,
  email: String,
  password: String,
  created: { type: Date, default: Date.now },
  weathers: [{type: mongoose.Schema.Types.ObjectId, ref: 'WeatherHistory'}]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;