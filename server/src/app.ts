import 'reflect-metadata'
import express, { type Application, type Response, type Request, type NextFunction } from 'express'
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

    this.initializeContainer()
    this.initializeSession()
    this.initializeMiddlewares()
    this.initializeDocs()
    this.initializeErrorHandling()

    this.connectToTheDatabase()
    this.initializePassportLocal()

    RegisterRoutes(this.app)
  }

  private initializeContainer (): void {
    Logger.info('Initializing the IOC container ...')
    // Todo: Setup IOC container.
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

    this.app.use('/docs', swaggerUi.serve, (_req: Request, res: Response, _next: NextFunction) => {
      return res.send(
        swaggerUi.generateHTML(import('./build/swagger.json'))
      )
    })
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
    Logger.info('Connecting to MongoDB ...')

    const {
      MONGO_HOST,
      MONGO_PORT,
      MONGO_DB
    } = process.env

    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const uri: string = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`

    Logger.debug(`Mongo Connection String: "${uri}"`)

    mongoose.set('strictQuery', false)
    mongoose.connect(uri, () => {
      Logger.info('Connected to MongoDB')
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
