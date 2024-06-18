import { Router, Request, Response } from "express";
import { hashPassword, mintToken } from "../../utils/authenticate";
import { retrieveUser, addUser } from "../../utils/database";
import { User } from "@prisma/client";
import { validateID } from "../../utils/sanitiser";

export const registerRoute = Router();

registerRoute.post("/", async (req: Request, res: Response) => {
	const { username, secret } = req.body;
	if (
		!username || // empty username
		!secret || // empty password
		username.length < 3 || // username.length is less than 3
		secret.length < 8 || // password.length is less than 8
		validateID(username) != "username" || // username contains foreign characters
		(await retrieveUser(username, { type: username })) // user already exists
	) {
		return res.sendStatus(400);
	}
	const encrypted_secret = await hashPassword(secret);
	const user = await addUser(username, encrypted_secret);
	const token = mintToken(user);
	res.send(token);
});
