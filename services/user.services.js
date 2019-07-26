const User = require('../models/user.model');

exports.createUser = async (param) => {
  try {
    const result = await User.create(param);
    return result;
  } catch (e) {
    throw Error(`Cann't create a user ${param.name}`)
  }
}

exports.findUser = async (param) => {
  try {
    const result = await User.findOne(param)
    return result;
  } catch (e) {
    throw Error(`Cann't find a user ${user.name}`)
  }
}

exports.findUserById = async (param) => {
  try {
    const result = await User.findById(param);
    return result;
  } catch (e) {
    throw Error(`Cann't find a user with id=${param}`);
  }
}

exports.updateUser = async (param, newData) => {
  try {
    const result = await User.findOneAndUpdate(
      {
        _id: param._id
      }, {
        $push: {
          weathers: newData
        }
      }, {
        useFindAndModify: false
      })
    return result;
  } catch (e) {
    throw Error(`Cann't update a user ${user.name}`)
  }
}
