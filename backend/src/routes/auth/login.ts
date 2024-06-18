import { Router, Request, Response } from "express";
import { mintToken, validatePassword } from "../../utils/authenticate";
import { retrieveUser, retrieveUserSecret } from "../../utils/database";

export const loginRoute = Router();

loginRoute.post("/", async (req: Request, res: Response) => {
	const { username, secret } = req.body;
	// you can actually login with uuid as your username :D
	if (!username || !secret) return res.sendStatus(400);
	const auth = await retrieveUserSecret(username, { type: "username" });
	if (!auth) return res.sendStatus(401);
	const user = await retrieveUser(username, { type: "username" });
	if (!user) return res.sendStatus(401);
	if (await validatePassword(auth, secret)) {
		const token = mintToken(user);
		res.send(token);
	}
});
