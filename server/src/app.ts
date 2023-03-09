import express from 'express';
import passport from 'passport';

import { User } from './models/user.model'
import session from 'express-session'
import errorMiddleware from "./middleware/error.middleware";
import morganMiddleware from "./middleware/morgan.middleware";
import helmet from "helmet";
import cookieParser from 'cookie-parser'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import {RegisterRoutes} from "./build/routes";

import * as mongoose from 'mongoose'
import Logger from "./utils/logger";

const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_HOST,
  MONGO_PORT,
  MONGO_DB
} = process.env

// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
const databaseUri: string = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`

const swaggerDocument = import('./build/swagger.json')
const swaggerOptions = { explorer: false }

const sessionOptions = {
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: false
  }
}

// Variables
const app = express()

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sessionOptions.cookie.secure = true // serve secure cookies
}

// Basic middleware
app.use(express.json())
app.use(errorMiddleware)
app.use(morganMiddleware)
app.use(helmet())
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(session(sessionOptions))

app.use(passport.initialize())
app.use(passport.session());

// use static authenticate method of the model in LocalStrategy
passport.use(User.createStrategy())

// use static serialize and deserialize of the model for passport session support
passport.serializeUser(User.serializeUser)
passport.deserializeUser(User.deserializeUser)


// Initialize swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions))

mongoose.set('strictQuery', false)

Logger.debug(`Mongo Connection String: "${databaseUri}"`)

const mongooseOptions: mongoose.ConnectOptions = {}

mongoose.connect(databaseUri, mongooseOptions,() => {
  Logger.info('Connected to MongoDB')
})

RegisterRoutes(app)

export default app
