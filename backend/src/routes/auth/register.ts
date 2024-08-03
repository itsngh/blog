import { Router, Request, Response } from "express";
import { validateID } from "../../utils/sanitiser";
import { retrieveUser } from "../../utils/database";
import argon2 from "argon2";
import { createSession } from "../../utils/cache";
import log from "../../utils/logger";

export const registerRoute = Router();

registerRoute.post("/", async (req: Request, res: Response) => {
	const { username, secret } = req.body;
	if (validateID(username) !== "username" || secret.length < 8)
		return res.sendStatus(400);
	if (await retrieveUser(username)) return res.sendStatus(400);
	// all the checks have passed, its time to register the user
	const user = await prisma.user.create({
		data: {
			username: username,
			keys: {
				create: {
					key: `username:${username}`,
					hashed_secret: await argon2.hash(secret),
					primary: true,
				},
			},
		},
	});
	if (!user) return res.sendStatus(500);
	const session = await createSession(user.uuid);
	if (!session) return res.sendStatus(500);
	return res.send(session);
});
