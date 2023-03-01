import express, { type Application, type Response, type Request, type NextFunction } from 'express'
import path from 'path'
import cors from 'cors'
import helmet from 'helmet'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import * as mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import errorMiddleware from './middleware/error.middleware'
import swaggerUi from 'swagger-ui-express'

import { RegisterRoutes } from './build/routes'

import { UserModel } from './models/user.model'

class App {
  public app: Application
  public port: number

  constructor (port: number) {
    this.app = express()
    this.port = port

    this.initializeContainer()
    this.initializeMiddlewares()
    this.initializeErrorHandling()

    this.connectToTheDatabase()
    this.initializePassportLocal()

    RegisterRoutes(this.app)
  }

  private initializeContainer (): void {
    // Todo: Setup IOC container.
  }

  private initializePassportLocal(): void {
    this.app.use(passport.initialize())
    this.app.use(passport.session())

    // use static authenticate method of the model in LocalStrategy.
    passport.use(new LocalStrategy(UserModel.authenticate()))

    // use static serialize and deserialize of the model for passport session support
    passport.serializeUser(UserModel.serializeUser())
    passport.deserializeUser(UserModel.deserializeUser())
  }

  private initializeMiddlewares (): void {
    this.app.use(helmet());
    this.app.use(cors())
    this.app.use(cookieParser())
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true } ))
    this.app.use(express.static(path.join(__dirname, 'public')))

    this.app.use('/docs', swaggerUi.serve, (_req: Request, res: Response, _next: NextFunction) => {
      return res.send(
        swaggerUi.generateHTML(import('./build/swagger.json'))
      )
    })
  }

  private initializeErrorHandling (): void {
    this.app.use(errorMiddleware)
  }

  private connectToTheDatabase (): void {
    const {
      // MONGO_USER,
      // MONGO_PASSWORD,
      MONGO_HOST,
      MONGO_PORT,
      MONGO_DB
    } = process.env

    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    // const uri: string = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`

    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const uri: string = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`

    console.log(`Mongo Connection String: "${uri}"`)

    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    console.log(`Connecting to "${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}" ...`)

    mongoose.set('strictQuery', false)
    mongoose.connect(uri, () => {
      console.log('Connected to MongoDB')
    })
  }

  public listen (): void {
    console.log(`Starting the API on port ${this.port} ...`)
    this.app.listen(this.port, () => {
      console.log(`App listening on port ${this.port}`)
    })
  }
}

export default App
