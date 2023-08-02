const { User, Response } = require('../model/userModel');
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

userController.saveQuery = async (req, res, next) => {
  try {
    const { username } = req.cookies;
    const { query, response } = req.body;

    const doc = await User.findOne({ username });
    doc.pastQueries.push({ query, response });
    const updated = await doc.save();

    try {
      const responses = await Response.create({
        query: query.toLowerCase(),
        response,
      });
    } catch (err) {
      console.log('Not adding dupped value');
    }
    console.log('This was hit');
    return next();
  } catch (err) {
    return next({
      method: 'Error in userController.saveQuery middleware',
      status: 400,
      err: { message: 'Error when request was received' },
    });
  }
};

userController.deleteUser = async (req, res, next) => {
  try {
    const { username } = req.cookies;

    const deletedUser = await User.deleteOne({ username });
    res.clearCookie('username');
    res.clearCookie('ssid');
    console.log('user deleted');
    return next();
  } catch (err) {
    return next({
      method: 'Error in userController.deleteUser middleware',
      status: 400,
      message: { err: 'A severe error has occured' },
    });
  }
};

module.exports = userController;
