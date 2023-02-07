import { RoutesConfig } from "../models/RoutesConfig";
import { Application } from "express";

export class UserRoutes extends RoutesConfig {
    constructor(app: Application) {
        super(app, "UsersRoutes");
    }

    configureRoutes() {
        this.app.route(`/api/users`)
            .get((req: any, res: any) => {
                res.status(200).send(`List of users`);
            })

            .post((req: any, res: any) => {
                res.status(200).send(`Post to users`);
            });

        this.app.route(`/api/users/:userId`)
            .all((req: any, res: any, next: any) => {
                // this middleware function runs before any request to /users/:userId
                // but it doesn't accomplish anything just yet---
                // it simply passes control to the next applicable function below using next()
                next();
            })
            .get((req: any, res: any) => {
                res.status(200).send(`GET requested for id ${req.params.userId}`);
            })
            .put((req: any, res: any) => {
                res.status(200).send(`PUT requested for id ${req.params.userId}`);
            })
            .delete((req: any, res: any) => {
                res.status(200).send(`DELETE requested for id ${req.params.userId}`);
            });

        return this.app;
    }
}
