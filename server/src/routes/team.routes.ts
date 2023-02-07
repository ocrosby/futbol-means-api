import { RoutesConfig } from "../models/RoutesConfig";
import { Application } from "express";

export class TeamRoutes extends RoutesConfig {
    constructor(app: Application) {
        super(app, "TeamsRoutes");
    }

    configureRoutes() {
        this.app.route(`/api/teams`)
            .get((req: any, res: any) => {
                res.status(200).send(`List of teams`);
            })

            .post((req: any, res: any) => {
                res.status(200).send(`Post to teams`);
            });

        this.app.route(`/api/teams/:teamId`)
            .all((req: any, res: any, next: any) => {
                // this middleware function runs before any request to /teams/:teamId
                // but it doesn't accomplish anything just yet---
                // it simply passes control to the next applicable function below using next()
                next();
            })
            .get((req: any, res: any) => {
                res.status(200).send(`GET requested for id ${req.params.teamId}`);
            })
            .put((req: any, res: any) => {
                res.status(200).send(`PUT requested for id ${req.params.teamId}`);
            })
            .delete((req: any, res: any) => {
                res.status(200).send(`DELETE requested for id ${req.params.teamId}`);
            });

        return this.app;
    }
}
