import express, {Request, Response} from 'express';
import path from 'path';
import User from './models/user.model'
import session from 'express-session'
import errorMiddleware from './middleware/error.middleware'
import morganMiddleware from './middleware/morgan.middleware'
import expressHealthcheck from 'express-healthcheck'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import passport from 'passport'
import swaggerUi from 'swagger-ui-express'
import {RegisterRoutes} from './build/routes'

import * as mongoose from 'mongoose'
import * as mongoutil from './utils/mongoose'
import Logger from './utils/logger';

import swaggerDocument from './build/swagger.json'
import {getReadyStateMessage} from "./utils/mongoose";

const {
  API_LOCAL_PORT
} = process.env

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
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


// Initialize swagger docs
Logger.info(`Serving Swagger docs at http://localhost:8000/api-docs`)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions))

mongoose.set('strictQuery', false)

const databaseUri = mongoutil.generateDatabaseUri();

Logger.debug(`Mongo Connection String: "${databaseUri}"`)

mongoose.connect(databaseUri, mongoutil.options)
  .then(() => {
    // ready to use
    Logger.info('Connected to MongoDB')
  }, (err: any) => {
    // handle initial connection error
    Logger.error(err)
  })

RegisterRoutes(app)

// Set up the health check route
app.use('/healthcheck', expressHealthcheck({
  healthy: () => {
    return {
      everything: 'is ok',
      uptime: process.uptime()
    }
  },
  test: (callback: any) => {
    // This function will be executed to establish the health of the application.
    if (mongoutil.isConnected()) {
      callback()
    } else {
      callback({
        state: 'unhealthy',
        uptime: process.uptime(),
        mongooseReadyState: mongoutil.getReadyStateMessage()
      })
    }
  }
}))

Logger.info(`View health check at http://localhost:${API_LOCAL_PORT}/healthcheck`)


// Serve static files

app.use(express.static(path.join(__dirname, 'public')))

// Set up the PUG template engine.

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', (req: Request, res: Response) => {
  return res.redirect('/home');
})

app.get('/home', (req: Request, res: Response) => {
  res.render('index', {
    subject: 'Pug template engine',
    name: 'our template',
    link: 'https://google.com'
  })
})

Logger.info(`View PUG interface at http://localhost:${API_LOCAL_PORT}`)

export default app
