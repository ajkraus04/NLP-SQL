const { User } = require('../model/userModel');

const cookieController = {};

cookieController.setSSIDCookie = async (req, res, next) => {
  try {
    const { username } = req.body;

    const user = await User.findOne({ username });
    console.log('Found User: ', user);
    res.cookie('ssid', user._id, { httpOnly: true });
    res.locals.ssid = user._id.toString();
    console.log(res.locals.ssid);
    return next();
  } catch (err) {
    return next({
      log: 'Error in cookieController.setSSIDCookie middleware',
      status: 400,
      message: { err },
    });
  }
};

module.exports = cookieController;
