const User = require('../models/user.model');

exports.createUser = async (param) => {
  try {
    const result = await User.create( param );
    return result;
  } catch(e) {
    throw Error(`Can't create a user ${user.name}`)
  }
}

exports.findUser = async (param) => {
  try {
    const result = await User.find(param)
    return result;
  } catch(e) {
    throw Error(`Can't find a user ${user.name}`)
  }
}
