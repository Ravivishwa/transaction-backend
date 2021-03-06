import express from 'express';
import bodyParser from 'body-parser';
import routes from '../api';
import config from '../config';
var cors = require('cors');
export default ({ app }: { app: express.Application }) => {
  app.use(cors());
  app.options('*', cors())

  app.get('/status', (req, res) => {
    res.status(200).end();
  });
  app.head('/status', (req, res) => {
    res.status(200).end();
  });

  app.enable('trust proxy');

  // app.use(cors());

  app.use(require('method-override')());

  app.use(bodyParser.json());
  app.use(config.api.prefix, routes());
  
 app.use((req, res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
  });

  /// error handlers
  app.use((err, req, res, next) => {
    /**
     * Handle 401 thrown by express-jwt library
     */
    if (err.name === 'UnauthorizedError') {
      return res
        .status(err.status)
        .send({ message: err.message })
        .end();
    }
    return next(err);
  });
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
};
