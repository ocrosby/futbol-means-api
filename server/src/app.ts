import express, { json, urlencoded, type Application, type Response, type Request, type NextFunction } from 'express'
import * as mongoose from 'mongoose'
import * as bodyParser from 'body-parser'
import errorMiddleware from './middleware/error.middleware'
import swaggerUi from 'swagger-ui-express'

import { RegisterRoutes } from './build/routes'

class App {
  public app: Application
  public port: number

  constructor (port: number) {
    this.app = express()
    this.port = port

    this.initializeContainer()
    this.connectToTheDatabase()
    this.initializeMiddlewares()
    this.initializeErrorHandling()

    RegisterRoutes(this.app)
  }

  private initializeContainer (): void {
    // Todo: Setup IOC container.
  }

  private initializeMiddlewares (): void {
    this.app.use(json())
    this.app.use(bodyParser.json())
    this.app.use(
      urlencoded({
        extended: true
      })
    )

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
