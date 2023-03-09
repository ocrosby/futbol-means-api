import * as dotenv from 'dotenv'
import { validateEnv } from "./utils/validateEnv";

import Logger from './utils/logger';

dotenv.config();
validateEnv();

import app from './app'

const PORT: Number = Number(process.env.API_LOCAL_PORT);

app.listen(PORT, () => {
  Logger.info(`listening on port ${PORT}`)}
)
