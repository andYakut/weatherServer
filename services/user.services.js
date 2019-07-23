const User = require('../models/user.model');

exports.createUser = async (user) => {
  const { username } = user;

  try {
    const hasUser = await User.find( { username }, function(err, data) {
      if(err) return err;
    } );

    if(hasUser.length !== 0) {
      throw Error(`User with name ${username} already exsist`);
    }

    await User.create( user, function (err, data) {
      if(err) return err;
    });

  } catch(e) {
    throw Error(`Can't create a user ${user.name}`)
  }
}