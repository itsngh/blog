import express, { json, urlencoded, Express, Request, Response } from "express";
import cors from "cors";
import { getEnvironmentOptions } from "./utils/environment";

import { loginRoute } from "./routes/auth/login";
import { registerRoute } from "./routes/auth/register";
import { postRoute } from "./routes/post";
import { userRoute } from "./routes/user";

import log from "./utils/logger";

const server: Express = express();
const envOptions = getEnvironmentOptions("BACKEND_PORT");

server.use(urlencoded({ extended: true }));
server.use(json());
server.use(cors());

server.use("/auth/login", loginRoute);
server.use("/auth/register", registerRoute);
server.use("/post", postRoute);
server.use("/user", userRoute);

server.listen(envOptions["BACKEND_PORT"], () => {
	log(`server is up at port ${envOptions["BACKEND_PORT"]}`, 4);
});
