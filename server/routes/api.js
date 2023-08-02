const express = require('express');
const path = require('path');

/**
 * Require Controllers
 */
const langchainController = require('../controllers/langChainController.js');
const userController = require(path.join(
  __dirname,
  '../controllers/userController.js'
));
const cookieController = require(path.join(
  __dirname,
  '../controllers/cookieController.js'
));
const sessionController = require(path.join(
  __dirname,
  '../controllers/sessionController.js'
));

const router = express.Router();

router.post(
  '/query',
  langchainController.handleQuery,
  langchainController.queryDB,
  (req, res) => res.status(200).send(res.locals.data)
);

/**
 * Login and Signup Endpoints
 */
router.post(
  '/login',
  userController.verifyUser,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res) => res.status(200).redirect('/home')
);

router.post(
  '/signup',
  userController.createUser,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res) => res.status(200).redirect('/home')
);

module.exports = router;
