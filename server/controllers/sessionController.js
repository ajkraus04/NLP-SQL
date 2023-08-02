const { Session } = require('../model/userModel.js');

const sessionController = {};

sessionController.startSession = async (req, res, next) => {
  const { ssid } = res.locals;
  console.log(ssid);
  try {
    if (ssid) {
      const sess = await Session.create({ cookieId: ssid });
      console.log(sess);
      return next();
    }
  } catch (err) {
    return next({
      log: 'Error in sessionController.startSession middleware',
      status: 400,
      message: { message: 'Wrong Info' },
    });
  }
};

sessionController.isLoggedIn = async (req, res, next) => {
  try {
    const { ssid } = req.cookies;
    const session = await Session.findOne({ cookieId: ssid });
    if (!session) {
      console.log('hit');
      return res.status(200).json('false');
    } else {
      return next();
    }
  } catch (err) {
    return next({
      log: 'Error in sessionController.isLoggedIn middleware',
      status: 400,
      message: { err },
    });
  }
};

module.exports = sessionController;
