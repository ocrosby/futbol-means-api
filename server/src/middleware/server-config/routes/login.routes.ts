import { RoutesConfig } from '../../../data-layer/models/RoutesConfig';
import { Application, Request, Response } from 'express';

import {
  LoginController,
  LoginParams,
} from '../../../service-layer/controllers/login.controller';

export class LoginRoutes extends RoutesConfig {
  constructor(app: Application) {
    super(app, 'LoginRoutes');
  }

  configureRoutes() {
    this.app.route(`/api/login`).post(async (req: Request, res: Response) => {
      const username: string = req.body.username;
      const password: string = req.body.password;
      const controller = new LoginController();
      const loginParams: LoginParams = { username, password };

      const response = await controller.login(loginParams);

      return res.send(response);
    });

    return this.app;
  }
}
