import { validateEnv } from "./utils/validateEnv";

import Logger from './utils/logger';

validateEnv();

import app from './app'

app.listen(process.env.API_LOCAL_PORT, () => {
  Logger.info(`listening on port ${process.env.API_LOCAL_PORT}`)}
)
