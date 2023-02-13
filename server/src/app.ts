import express, {Application} from 'express';
import * as bodyParser from 'body-parser';
import IController from "./controller.interface";

class App {
  public app: Application;
  public port: number;

  constructor(controllers: IController[], port: number) {
    this.app = express()
    this.port = port;

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
  }

  private initializeControllers(controllers: IController[]) {
    controllers.forEach((controller) => {
      this.app.use(controller.path, controller.router);
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on port ${this.port}`);
    });
  }
}

export default App;
