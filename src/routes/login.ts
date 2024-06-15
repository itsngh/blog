import { Router, Request, Response } from "express";
import { mintToken, validatePassword } from "../utils/authenticate";
import { retrieveUser } from "../utils/database";

export const loginRoute = Router();

loginRoute.post("/", async (req: Request, res: Response) => {
	const { username, secret } = req.body;
	if (!username || !secret) res.sendStatus(400);
	const user = retrieveUser(username);
	if (!user) res.sendStatus(400);
	if (await validatePassword(user, secret)) {
		const token = mintToken(user);
		if (!token) res.sendStatus(400);
		else res.send(token);
	} else res.sendStatus(401);
});
