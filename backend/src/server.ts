import express, { json, urlencoded, Express, Request, Response } from "express";
import cors from "cors";
import cookieparser from "cookie-parser";
import routes from "./routes/routes";
import log from "./utils/logger";
import environmentVariables from "./utils/environment";

// express app
const server: Express = express();

// body parsers middlewares
server.use(urlencoded({ extended: true }));
server.use(json());
server.use(cookieparser());

// CORS middleware
server.use(cors());

// routes
server.use("/", routes);

server.listen(environmentVariables.BACKEND_PORT, () => {
	log(`server is up at ports ${environmentVariables.BACKEND_PORT}`, 4);
});
