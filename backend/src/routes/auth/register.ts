import { Router, Request, Response } from "express";
import { hashPassword, mintToken } from "../../utils/authenticate";
import { addUser, retrieveUser, retrieveUsers } from "../../utils/database";
import { User } from "@prisma/client";

export const registerRoute = Router();

registerRoute.post("/", async (req: Request, res: Response) => {
	const { username, secret } = req.body;
	if (
		!username || // empty username
		!secret || // empty password
		username.length < 3 || // username.length is less than 3
		secret.length < 8 || // password.length is less than 8
		/[^a-zA-Z0-9]/i.test(username) || // username contains foreign characters
		(await retrieveUser(username, false)) // user already exists
	)
		res.sendStatus(400);
	else {
		const encrypted_secret = await hashPassword(secret);
		const user: User = await addUser(username, encrypted_secret);
		const token = mintToken(user);
		res.send(token);
	}
});
