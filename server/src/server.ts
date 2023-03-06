import * as dotenv from 'dotenv'
import { validateEnv } from "./utils/validateEnv";

dotenv.config();
validateEnv();

import app from './app'

let port: number = Number(process.env.API_LOCAL_PORT);

if (Number.isNaN(port)) port = 8000;

app.listen(port);
