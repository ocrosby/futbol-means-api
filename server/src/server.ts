import * as dotenv from 'dotenv'
import { validateEnv } from "./utils/validateEnv";

dotenv.config();
validateEnv();

import app from './app'

const PORT: Number = Number(process.env.API_LOCAL_PORT);

app.listen(PORT, () => console.log(`running on port ${PORT}`));
