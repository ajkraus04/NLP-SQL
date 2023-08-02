const runQuery = require('../helpers/langChainHandler.js');

const langchainController = {};

langchainController.handleQuery = (req, res, next) => {
  console.log('run');
  const { query } = req.body;
  if (!query) {
    return next({
      log: 'Express error handler caught error in langChainController.handleQuery',
      status: 400,
      message: { err },
    });
  }
  return next();
};

langchainController.queryDB = async (req, res, next) => {
  const { query } = req.body;
  try {
    const output = await runQuery(query);
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
