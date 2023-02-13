import * as methodOverride from 'method-override';
import express, { Application } from 'express';
import * as bodyParser from 'body-parser';
import { RegisterRoutes } from './service-layer/controllers/routes';

import config = require('config');


import { logger } from './middleware/common/logging';



// ########################################################################
// controllers need to be referenced in order to get crawled by the generator
import './service-layer/controllers/ping.controller'
// ########################################################################





import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import * as health from 'express-ping';

import './types';

const app: Application = express();

let server: any;

const port = config.get('express.port');
const debugPort = config.get('express.debug');

app.use('/docs', express.static(__dirname + '/presentation-layer/documentation/swagger-ui'));

app.use(cors.default());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser.default());
app.use(methodOverride.default());
app.use(health.ping());

RegisterRoutes(app);

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
