import express, { json, urlencoded, Express, Request, Response } from "express";
import cors from "cors";
import cookieparser from "cookie-parser";
import { getEnvironmentOptions } from "./utils/environment";

import { authRoute } from "./routes/auth";
import { postRoute } from "./routes/post";
import { userRoute } from "./routes/user";

import log from "./utils/logger";

// express app
const server: Express = express();
const envOptions = getEnvironmentOptions("BACKEND_PORT");

// body parsers middlewares
server.use(urlencoded({ extended: true }));
server.use(json());
server.use(cookieparser());

// CORS middleware
server.use(cors());

server.use("/auth", authRoute);
server.use("/post", postRoute);
server.use("/user", userRoute);

server.listen(envOptions["BACKEND_PORT"], () => {
	log(`server is up at port ${envOptions["BACKEND_PORT"]}`, 4);
});
