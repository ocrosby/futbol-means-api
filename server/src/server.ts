import * as dotenv from 'dotenv'

import App from './app'

import { validateEnv } from './utils/validateEnv'

dotenv.config()

validateEnv()

let port: number = Number(process.env.API_LOCAL_PORT)

if (Number.isNaN(port)) port = 8000

const app = new App(port)

app.listen()
