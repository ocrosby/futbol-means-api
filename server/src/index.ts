import settings from "../package.json";
import dotenv from "dotenv";
import express, { Application } from "express";
import morgan from "morgan";
import path from "path";
import bodyParser from "body-parser";
import Logger from "./common/logger";
import morganMiddleware from "./config/morganMiddleware";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express"
import Router from "./routes";

const port: string = process.env.SERVER_PORT || "8000";

dotenv.config(); // initialize configuration

const app: Application = express();

// app.use(express.json());
app.use(bodyParser.json()); // configures body parser to parse JSON
app.use(bodyParser.urlencoded({ extended: false })); // configures body parser to parse url encoded data
app.use(express.static("public")); // configures express to serve static files from public folder
app.use(morganMiddleware); // configures morgan to log HTTP requests

app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
        explorer: false,
        swaggerOptions: {
            url: "/swagger.json"
        },
    })
);

app.get('/favicon.ico', (_req, res) => res.status(204).end()); // ignore favicon requests

app.get("/logger", (_, res) => {
    Logger.error("This is an error log");
    Logger.warn("This is a warn log");
    Logger.info("This is a info log");
    Logger.http("This is a http log");
    Logger.debug("This is a debug log");

    res.send("Hello world");
});

app.use("/api", Router);

app.listen(port, () => {
    Logger.debug(`server started at http://localhost:${port}`);
});
