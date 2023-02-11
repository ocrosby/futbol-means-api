import { RoutesConfig } from '../../../data-layer/models/RoutesConfig';
import { Application, Request, Response } from 'express';

import { LoginController } from '../../../service-layer/controllers/login.controller';

export class LoginRoutes extends RoutesConfig {
  constructor(app: Application) {
    super(app, 'LoginRoutes');
  }

  configureRoutes() {
    this.app.route(`/api/login`).post(async (req: Request, res: Response) => {
      const username: string = req.body.username;
      const password: string = req.body.password;
      const controller = new LoginController();

      const response = await controller.login(username, password);

      return res.send(response);
    });

    return this.app;
  }
}
