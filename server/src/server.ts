import * as dotenv from 'dotenv'

import { createApp } from './app'
import { validateEnv } from './utils/validateEnv'

dotenv.config()

validateEnv()

createApp(process.env.API_LOCAL_PORT).listen()
