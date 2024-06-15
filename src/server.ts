import express, { json, Express, Request, Response } from "express";
import cors from "cors";
import { getEnvironmentOptions } from "./utils/environment";

import { loginRoute } from "./routes/login";
import { registerRoute } from "./routes/register";

const server: Express = express();
const envOptions = getEnvironmentOptions("BACKEND_PORT");

server.use(json());
server.use(cors());

server.use("/login", loginRoute);
server.use("/register", registerRoute);

server.get("/", (req: Request, res: Response) => {
	res.sendStatus(200);
});

server.listen(envOptions["BACKEND_PORT"], () => {
	console.log(`server is up at port ${envOptions["BACKEND_PORT"]}`);
});
