import 'reflect-metadata'
import express, { type Application } from 'express'
import session from 'express-session'
import path from 'path'
import cors from 'cors'
import helmet from 'helmet'
import passport from 'passport'
import * as mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import errorMiddleware from './middleware/error.middleware'
import swaggerUi from 'swagger-ui-express'

import Logger from './utils/logger'

import { RegisterRoutes } from './build/routes'

import { UserModel } from './models/user.model'
import morganMiddleware from "./middleware/morgan.middleware";

class App {
  public app: Application
  public port: number

  constructor (port: number) {
    Logger.info('Starting the API ...')

    this.app = express()
    this.port = port

    this.initializeSession()
    this.initializeMiddlewares()
    this.initializeErrorHandling()

    this.connectToTheDatabase()
    this.initializePassportLocal()

    RegisterRoutes(this.app)

    this.initializeDocs()
  }

  private initializePassportLocal(): void {
    Logger.info('Initializing passport local ...')

    this.app.use(passport.initialize())
    this.app.use(passport.session())

    // use static authenticate method of the model in LocalStrategy.
    passport.use(UserModel.createStrategy())

    // use static serialize and deserialize of the model for passport session support
    passport.serializeUser(UserModel.serializeUser)
    passport.deserializeUser(UserModel.deserializeUser)
  }

  private initializeDocs(): void {
    Logger.info('Initializing Swagger docs ...')

    const swaggerDocument = require('./build/swagger.json')

    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { explorer: true }))

    Logger.info(`Swagger http://localhost:${this.port}/api-docs`)
  }

  private initializeSession(): void {
    Logger.info('Initializing the express session ...')

    const sessionOptions = {
      secret: 'keyboard cat',
      resave: true,
      saveUninitialized: true,
      cookie: {
        secure: false
      }
    }

    if (this.app.get('env') === 'production') {
      this.app.set('trust proxy', 1) // trust first proxy
      sessionOptions.cookie.secure = true // serve secure cookies
    }

    this.app.use(session(sessionOptions))
  }

  private initializeMiddlewares (): void {
    Logger.info('Initializing middleware ...')

    this.app.use(morganMiddleware)
    this.app.use(helmet())
    this.app.use(cors())
    this.app.use(cookieParser())
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true } ))
    this.app.use(express.static(path.join(__dirname, 'public')))
  }

  private initializeErrorHandling (): void {
    Logger.info('Initializing error handling ...')

    this.app.use(errorMiddleware)
  }

  private connectToTheDatabase (): void {
    const {
      MONGO_USER,
      MONGO_PASSWORD,
      MONGO_HOST,
      MONGO_PORT,
      MONGO_DB
    } = process.env

    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const uri: string = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`
    const options: mongoose.ConnectOptions = {
      autoIndex: false, // don't build indexes
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      family: 4, // Use IPv4, skip trying IPv6
      authSource: "admin",
      user: MONGO_USER,
      pass: MONGO_PASSWORD
    }

    Logger.debug(`Connecting to MongoDB "${uri}" ...`)

    mongoose.set('strictQuery', false)

    mongoose.connect(uri, options)
      .then(() => {
        Logger.info('Successfully connected to MongoDB!')
      },
      err => {
        Logger.error(err)
        Logger.info(`Make sure MongoDB is up and running at ${MONGO_HOST}:${MONGO_PORT}.`)
      })
  }

  public listen (): void {
    Logger.info(`Starting the API on port ${this.port} ...`)

    this.app.listen(this.port, () => {
      Logger.info(`App listening on port ${this.port}`)
    })
  }
}

export default App
