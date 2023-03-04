import express from 'express';
import passport from 'passport';

import { UserModel } from './models/user.model'
import morganMiddleware from "./middleware/morgan.middleware";
import helmet from "helmet";
import cookieParser from 'cookie-parser'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'

function createServer(): express.Application {
  const swaggerDocument = import('./build/swagger.json')
  const swaggerOptions = { explorer: false }

  const app = express()

  app.use(express.json())
  app.use(morganMiddleware)
  app.use(helmet())
  app.use(cors())
  app.use(cookieParser())
  app.use(express.json())
  app.use(express.urlencoded({extended: true}))

  app.use(passport.initialize())
  app.use(passport.session());

  // use static authenticate method of the model in LocalStrategy
  passport.use(UserModel.createStrategy())

  // use static serialize and deserialize of the model for passport session support
  passport.serializeUser(UserModel.serializeUser)
  passport.deserializeUser(UserModel.deserializeUser)


  // Initialize swagger docs
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions))

  app.use("/api", routes)

  return app
}

module.exports = createServer
