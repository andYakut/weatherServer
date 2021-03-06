const mongoose = require('mongoose');
const { saltRounds, privateKey } = require('../config/constants');
const UserService = require('../services/user.services');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res, next) => {
  let newUser = {};
  if (!req.body.username || !req.body.email || !req.body.password) {
    throw new Error('Some fields are empty')
  }

  if (req.body.password !== req.body.confirmPassword) {
    throw new Error("Passwords don't match");
  }

  try {
    const findUser = await UserService.findUser({ email: req.body.email });
    if (findUser) throw new Error('This user already exists')

    const hash = await bcrypt.hash(req.body.password, saltRounds);
    newUser = {
      _id: new mongoose.Types.ObjectId(),
      email: req.body.email,
      username: req.body.username,
      password: hash,
      created: Date.now()
    };

    await UserService.createUser(newUser);
    return res.status(200).json({ status: 200, message: "User is successful created" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}

exports.authUser = async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    throw new Error('Some fields are empty')
  }

  try {
    const user = await UserService.findUser({ email: req.body.email });
    if(user === null) {
      return res.status(404).json({message: `User with email ${req.body.email} doesn't exist`});
    }
    const match = await bcrypt.compare(req.body.password, user.password);
    if(match) {
      let token = jwt.sign({id: user._id}, privateKey, {expiresIn: 129600});
      return res.status(200).json({
        success: true, 
        message: "You are login now",
        token
      });
    } else {
      return res.status(401).json({
        success: false, 
        token: null, 
        message: 'Username or password is incorrect'
      });
    }

  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}

exports.checkLogin = async (req, res) => {  
  return res.status(200).json({message: "ok"});
}