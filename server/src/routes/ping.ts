import { RoutesConfig } from "../common/RoutesConfig";
import { Application } from "express";
import { PingController } from "../controllers/ping";

export class PingRoutes extends RoutesConfig {
    constructor(app: Application) {
        super(app, "PingRoutes");
    }

    configureRoutes() {
        this.app.route(`/api/ping`)
            .get(async (req: any, res: any) => {
                const controller = new PingController();
                const response = await controller.getMessage();

                return res.send(response);
            });

        return this.app;
    }
}
