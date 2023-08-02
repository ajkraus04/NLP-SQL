const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const userController = require('./controllers/userController');
const sessionController = require('./controllers/sessionController');

const app = express();
const PORT = 3000;

/**
 * API ROUTER
 */
const apiRouter = require(path.join(__dirname, './routes/api.js'));

/**
 * Global Parsing
 */
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

/**
 * Serve Static Files
 */
if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.join(__dirname, '../build')));
}
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

/**
 *  Handle Home Page Permisions to API Endpoint
 */

/**
 *  Handle Requests to API Endpoint
 */
app.use('/api', apiRouter);

/**
 * Endpoint Error Handling
 */
app.use('*', (req, res, err) => {
  console.log(err);
  return res.status(404).send('Endpoint does not exist');
});

/**
 * Global Error handling
 */
app.use((err, req, res, nexx) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occured' },
  };

  const errObj = Object.assign(defaultErr, err);
  console.log(errObj.log);
  return res.status(errObj.status).send(errObj.message);
});

/**
 * Start Server
 */
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports == app;
