const UserService = require('../services/user.services');

exports.createUser = async (req, res, next) => {
  if(!req.body.username || !req.body.email && !req.body.password) {
    // more validations
    throw new Error('Some fields are empty')
  } 

  try {
    const findUser = await UserService.findUser({email: req.body.email});
    if (findUser.length > 0) throw new Error('This user already exists')
    
    // make hash of the password using bcrypt
    
    const newUser = {
      email: req.body.email,
      password: 'hashedPassword',
      username: req.body.username,
      created: Date.now() 
    };

    const createdUser = await UserService.createUser(newUser);
    return res.status(200).json({ status: 200, message: "User is successful created" });
  } catch(e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}