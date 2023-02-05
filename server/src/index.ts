import dotenv from "dotenv";
import express from "express";
import path from "path";
import bodyParser from "body-parser";

import * as routes from "./routes";

// initialize configuration
dotenv.config();

// port is now available to the Node.js runtime
// as if it were an environment variable

const port = process.env.SERVER_PORT; // default port to listen

const app = express();

// configures body parser to parse JSON
app.use(bodyParser.json());

// configures body parser to parse url encoded data
app.use(bodyParser.urlencoded({extended: false}));

// Configure routes
routes.register(app);

// start the Express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});
