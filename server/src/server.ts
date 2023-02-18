// import express, {Router, Application, NextFunction, Request, Response} from "express";

import * as dotenv from 'dotenv';

dotenv.config();

// import 'dotenv/config';



import App from "./app";

import { validateEnv } from './utils/validateEnv';

const port: number = 8000;

validateEnv();

const app = new App(port);

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
