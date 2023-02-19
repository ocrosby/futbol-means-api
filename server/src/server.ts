import "reflect-metadata";
import * as dotenv from 'dotenv';

dotenv.config();

import App from "./app";

import { validateEnv } from './utils/validateEnv';

const port: number = Number(process.env.port) || 8000;

validateEnv();

const app = new App(port);

app.listen();
