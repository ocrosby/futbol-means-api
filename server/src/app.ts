import express, {Application} from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import errorMiddleware from "./middleware/error.middleware";

class App {
  public app: Application;
  public port: number;

  constructor(port: number) {
    this.app = express()
    this.port = port;

    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
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
