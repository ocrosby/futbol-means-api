import 'reflect-metadata'
import * as dotenv from 'dotenv'

import App from './app'

import { validateEnv } from './utils/validateEnv'

dotenv.config()

const port: number = Number.isNaN(process.env.port) ? 8000 : Number(process.env.port)

validateEnv()

const app = new App(port)

app.listen()
