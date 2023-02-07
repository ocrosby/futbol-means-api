import express from "express";
import { Application } from "express";
import { EventRoutes } from "./event.routes";
import { LoginRoutes } from "./login.routes";
import { PingRoutes } from "./ping.routes";
import { PlayersRoutes } from "./player.routes";
import { TeamRoutes } from "./team.routes";
import { UserRoutes } from "./user.routes";

const router = express.Router();

const app: Application = express.application;

(new EventRoutes(app)).configureRoutes();
(new LoginRoutes(app)).configureRoutes();
(new PingRoutes(app)).configureRoutes();
(new PlayersRoutes(app)).configureRoutes();
(new TeamRoutes(app)).configureRoutes();
(new UserRoutes(app)).configureRoutes();

export default router;


// export const register = (app: express.Application) => {
//     const oidc = app.locals.oidc;

//     // define a route handler for the default home page
//     app.get( "/", ( req, res ) => {
//         res.send( "Hello world!" );
//     });

//     // define a route handler for the default home page
//     // app.get("/", (req: any, res) => {
//     //     res.render("index");
//     // });

//     // define a secure route handler for the login page that redirects to /guitars
//     app.get("/login", oidc.ensureAuthenticated(), (req, res) => {
//         res.redirect( "/guitars" );
//     });

//     // define a route to handle logout
//     app.get("/logout", (req: any, res) => {
//         req.logout();
//         res.redirect("/");
//     });

//     // define a secure route handler for the guitars page
//     app.get("/guitars", oidc.ensureAuthenticated(), (req: any, res) => {
//         res.render( "guitars" );
//     });
// };