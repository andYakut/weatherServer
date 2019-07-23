const UserService = require('../services/user.services');

exports.createUser = async (req, res, next) => {
  let user = req.body;
  user = {...user, created: Date.now() };

  try {
    const createdUser = await UserService.createUser(user);
    return res.status(200).json({ status: 200, data: createdUser, message: "User is successful created" });
  } catch(e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}