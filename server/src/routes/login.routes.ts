import { RoutesConfig } from "../models/RoutesConfig";
import { Application } from "express";

import { LoginController } from "../controllers/login";

export class LoginRoutes extends RoutesConfig {
    constructor(app: Application) {
        super(app, "LoginRoutes");
    }

    configureRoutes() {
        this.app.route(`/api/login`)
            .post(async (req: any, res: any) => {
                const username: string = req.body.username;
                const password: string = req.body.password;
                const controller = new LoginController();

                const response = await controller.login(username, password);

                return res.send(response);
            });

        return this.app;
    }
}
