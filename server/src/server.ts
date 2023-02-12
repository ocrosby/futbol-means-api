import config = require('config');

import express, { Application, NextFunction, Request, Response } from 'express';
import { ExpressConfig } from './middleware/server-config/Express';
import http = require('http');
import { logger } from './middleware/common/logging';

import './service-layer/controllers/AuthorizationController';
import './service-layer/controllers/UsersController';
import { RegisterRoutes } from './middleware/server-config/Routes';

import * as methodOverride from 'method-override';
import * as bodyParser from 'body-parser';

import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import * as health from 'express-ping';

import './types';

const app: Application = express();

let server: any;

// var express = new ExpressConfig();
const port = config.get('express.port');

const debugPort = config.get('express.debug');
app.use('/docs', express.static(__dirname + '/swagger-ui'));
app.use('/swagger.json', (_req: Request, res: Response) => {
  res.sendFile('./dist/swagger.json');
});
app.use(cors.default());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser.default());
app.use(methodOverride.default());
app.use(health.ping());

RegisterRoutes(app);

function clientErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (Object.prototype.hasOwnProperty.call(err, 'thrown') && err.thrown) {
    res.status(err.status).send({ error: err.message });
  } else {
    next(err);
  }
}

app.use(clientErrorHandler);

server = app.listen(port, () => {
  const expressHost = server.address();
  const expressPort = server.address().port;
  logger.info(`
    ------------
    Server Started!
    Express: http://${expressHost}:${expressPort}
    Debugger: http:/${expressHost}:${expressPort}/?ws=${expressHost}:${expressPort}&port=${debugPort}


    Health: http://${expressHost}:${expressPort}/ping
    Swagger Docs: http://${expressHost}:${expressPort}/docs
    Swagger Spec: http://${expressHost}:${expressPort}/api-docs
    ------------
  `);
});
