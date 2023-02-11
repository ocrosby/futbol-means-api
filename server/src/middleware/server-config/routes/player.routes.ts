import { RoutesConfig } from '../../../data-layer/models/RoutesConfig';
import { Application } from "express";

export class PlayersRoutes extends RoutesConfig {
    constructor(app: Application) {
        super(app, "PlayersRoutes");
    }

    configureRoutes() {
        this.app.route(`/api/players`)
            .get((req: any, res: any) => {
                res.status(200).send(`List of players`);
            })

            .post((req: any, res: any) => {
                res.status(200).send(`Post to players`);
            });

        this.app.route(`/api/players/:playerId`)
            .all((req: any, res: any, next: any) => {
                // this middleware function runs before any request to /players/:playerId
                // but it doesn't accomplish anything just yet---
                // it simply passes control to the next applicable function below using next()
                next();
            })
            .get((req: any, res: any) => {
                res.status(200).send(`GET requested for id ${req.params.playerId}`);
            })
            .put((req: any, res: any) => {
                res.status(200).send(`PUT requested for id ${req.params.playerId}`);
            })
            .delete((req: any, res: any) => {
                res.status(200).send(`DELETE requested for id ${req.params.playerId}`);
            });

        return this.app;
    }
}
