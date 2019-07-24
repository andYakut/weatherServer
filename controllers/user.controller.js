const { saltRounds } = require('../config/constants');
const UserService = require('../services/user.services');
const bcrypt = require('bcrypt');

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
    if (findUser.length > 0) throw new Error('This user already exists')

    // make hash of the password using bcrypt

    const hash = await bcrypt.hash(req.body.password, saltRounds);
    console.log(hash);

    newUser = {
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