import { RoutesConfig } from "../common/RoutesConfig";
import { Application } from "express";

export class EventsRoutes extends RoutesConfig {
    constructor(app: Application) {
        super(app, "EventsRoutes");
    }

    configureRoutes() {
        this.app.route(`/api/events`)
            .get((req: any, res: any) => {
                res.status(200).send(`List of events`);
            })

            .post((req: any, res: any) => {
                res.status(200).send(`Post to events`);
            });

        this.app.route(`/api/events/:eventId`)
            .all((req: any, res: any, next: any) => {
                // this middleware function runs before any request to /events/:eventId
                // but it doesn't accomplish anything just yet---
                // it simply passes control to the next applicable function below using next()
                next();
            })
            .get((req: any, res: any) => {
                res.status(200).send(`GET requested for id ${req.params.eventId}`);
            })
            .put((req: any, res: any) => {
                res.status(200).send(`PUT requested for id ${req.params.eventId}`);
            })
            .delete((req: any, res: any) => {
                res.status(200).send(`DELETE requested for id ${req.params.eventId}`);
            });

        return this.app;
    }
}
