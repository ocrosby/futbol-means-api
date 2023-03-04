import * as dotenv from 'dotenv'

import { createServer } from './app'
import { validateEnv } from './utils/validateEnv'

dotenv.config()

validateEnv()

const server = createServer(true, process.env.API_LOCAL_PORT)

module.exports = server.app
