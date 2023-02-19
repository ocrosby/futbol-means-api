import express, {json, urlencoded, Application, Response, Request, NextFunction} from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import errorMiddleware from "./middleware/error.middleware";
import { RegisterRoutes } from "./build/routes";
import swaggerUi from "swagger-ui-express";

class App {
  public app: Application;
  public port: number;

  constructor(port: number) {
    this.app = express()
    this.port = port;

    this.initializeContainer();
    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeErrorHandling();

    RegisterRoutes(this.app);
  }

  private initializeContainer() {
    // Todo: Setup IOC container.
  }

  private initializeMiddlewares() {
    this.app.use(json());
    this.app.use(bodyParser.json());
    this.app.use(
      urlencoded({
        extended: true
      })
    );

    this.app.use("/docs", swaggerUi.serve, async (_req: Request, res: Response, _next: NextFunction) => {
      return res.send(
        swaggerUi.generateHTML(await import("./build/swagger.json"))
      );
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private connectToTheDatabase() {
    const {
      MONGO_USER,
      MONGO_PASSWORD,
      MONGO_HOST,
      MONGO_PORT,
      MONGO_DB
    } = process.env;
    const uri: string = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;

    console.log(`Connecting to "${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}" ...`);

    mongoose.set('strictQuery', false);
    mongoose.connect(uri, () => {
      console.log('Connected to MongoDB');
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on port ${this.port}`);
    });
  }
}

export default App;
