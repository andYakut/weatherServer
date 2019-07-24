const api = require('../apis/api').api;

exports.getWeather = async (req, res, next) => {
  const responce = await api.get('/forecast', {
    params: {
      appid: 'a296ac97ed235ce1bb7927ede91f4b32',
      lat: 50,
      lon: 50
    }
   });

   return res.status(200).send(responce.data.list);
}