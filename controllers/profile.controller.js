const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { saltRounds, privateKey } = require('../config/constants');
const UserService = require('../services/user.services');

exports.getProfile = async (req, res) => {
  return res.status(200).send({username: req.user.username});
}

exports.editProfile = async (req, res) => {
  
  try {
    const hash = await bcrypt.hash(req.body.password, saltRounds);
    
    const newData = {
      username: req.body.username,
      password: hash
    }
    await UserService.updateUser(req.user._id, newData);
    return res.status(200).json({message: `${newData.username} successful update`});
  } catch(e) {
    return res.status(500).json({message: "Internal server error"});
  }
}