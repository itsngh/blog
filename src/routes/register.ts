import { Router, Request, Response } from "express";
import { hashPassword } from "../utils/authenticate";
import { retrieveUsers } from "../utils/database";

export const registerRoute = Router();

registerRoute
	.get("/", async (req: Request, res: Response) => {
		const users = await retrieveUsers();
		res.send(users);
	})
	.post("/", async (req: Request, res: Response) => {
		const { username, secret } = req.body;
		if (
			!username || // empty username
			!secret || // empty password
			username.length < 3 || // username.length is less than 3
			secret.length < 8 || // password.length is less than 8
			/[^a-zA-Z0-9]/i.test(username) // username contains foreign characters
		)
			res.sendStatus(400);
		else {
			res.sendStatus(200);
		}
		// TODO check if username exists
		// TODO write hashed pw into db and return a signed token as if user had just logged in.
	});
