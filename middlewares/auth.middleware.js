const { privateKey } = require('../config/constants');
const jwt = require('jsonwebtoken');
const UserService = require('../services/user.services');

exports.checkAuth = async (req, res, next) => {
  try {
    const decode = await jwt.verify(req.headers.token, privateKey);
    const user = await UserService.findUserById(decode.id);
    if(user === null) {
      return res.status(403).json({message: "Forbidden"});
    }
    req.user = user;
    next();
  } catch (e) {
    return res.status(403).json({message: "Forbidden"});
  }
}