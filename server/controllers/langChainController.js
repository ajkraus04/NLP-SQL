const runQuery = require('../helpers/langChainHandler.js');
const { Response } = require('../model/userModel.js');

const langchainController = {};

langchainController.handleQuery = async (req, res, next) => {
  console.log('run');
  const { query, uri } = req.body;
  const question = query.toLowerCase();
  const cached = await Response.findOne({ query: question });
  console.log(cached);
  if (cached) {
    console.log('Sending Cached result to user');
    return res.status(200).json(cached.response);
  }
  if (!query || !uri) {
    return next({
      log: 'Express error handler caught error in langChainController.handleQuery',
      status: 400,
      message: { err },
    });
  }
  return next();
};

langchainController.queryDB = async (req, res, next) => {
  const { query, uri } = req.body;
  try {
    const output = await runQuery(query, uri);
    res.locals.data = output;
    return next();
  } catch (err) {
    return next({
      log: 'Express error handler caught error in langChainController.queryDB',
      status: 400,
      message: { err },
    });
  }
};

module.exports = langchainController;
