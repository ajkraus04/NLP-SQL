const { User } = require('../model/userModel');
const bcrypt = require('bcrypt');

const userController = {};

userController.verifyUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);
    const user = await User.findOne({ username });
    console.log(user);
    if (user === null) {
      console.log('hit');
      return res.status(200).redirect('/signup');
    }

    if (bcrypt.compareSync(password, user.password)) {
      return next();
    } else {
      console.log('hit');
      return res.status(200).redirect('/signup');
    }
  } catch (err) {
    return next({
      message: { err: 'Wrong Stuff' },
    });
  }
};

userController.createUser = async (req, res, next) => {
  const { username, password } = req.body;

  if (
    username &&
    password &&
    typeof username === 'string' &&
    typeof password === 'string'
  ) {
    const user1 = await User.create({ username, password });
    console.log(`Added ${user1} to the database`);
    return next();
  }
  return next({
    method: 'Error in createUser in userController.',
    log: 'Error wrong username or password',
  });
};

module.exports = userController;
