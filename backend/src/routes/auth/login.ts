import { Router, Request, Response } from "express";
import { mintToken, validatePassword } from "../../utils/authenticate";
import { retrieveUser } from "../../utils/database";

export const loginRoute = Router();

loginRoute.post("/", async (req: Request, res: Response) => {
	const { username, secret } = req.body;
	if (!username || !secret) res.sendStatus(400);
	else {
		const user = await retrieveUser(username, false);
		if (!user) res.sendStatus(401);
		else {
			if (await validatePassword(user, secret)) {
				const token = mintToken(user);
				res.send(token);
			}
		}
	}
});
