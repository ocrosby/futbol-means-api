// import express, {Router, Application, NextFunction, Request, Response} from "express";

import * as dotenv from 'dotenv';

dotenv.config();

import * as mongoose from 'mongoose';
import 'dotenv/config';

// const {
//   MONGO_USER,
//   MONGO_PASSWORD,
//   MONGO_PATH,
// } = process.env;
//
// mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`);

import App from "./app";
import TeamsController from "./teams/teams.controller";
import PlayersController from "./players/players.controller";
import IController from "./controller.interface";

import { validateEnv } from './utils/validateEnv';

const controllers: IController[] = [];
const port: number = 8000;

controllers.push(new TeamsController());
controllers.push(new PlayersController());

validateEnv();

const app = new App(controllers, port);

app.listen();

/*
const router: Router = express.Router();

function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
  console.log(`${req.method} ${req.path}`);
  next();
}

app.use(loggerMiddleware);
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send({
    hostname: req.hostname,
    path: req.path,
    method: req.method
  });
});


router.get('/hello', (req: Request, res: Response) => {
  res.send('Hello World!');
});

router.post('/example/post', (req: Request, res: Response) => {
  res.send(req.body);
});


app.listen(8000);
*/
