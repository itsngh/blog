import { Router, Request, Response } from "express";
import { validateID } from "../../utils/sanitiser";
import argon2 from "argon2";
import redis, { createSession } from "../../utils/cache";
export const loginRoute = Router();

loginRoute.post("/", async (req: Request, res: Response) => {
	const { username, secret } = req.body;
	if (!validateID(username) || secret.length < 8) return res.sendStatus(400);
	const user = await prisma.user.findUnique({
		where: { username: username },
	});
	if (!user) return res.sendStatus(404);
	const retrieved_key = await prisma.key.findFirst({
		where: { user_uuid: user.uuid },
	});
	if (!retrieved_key) return res.sendStatus(500);
	if (!(await argon2.verify(retrieved_key.hashed_secret, secret)))
		return res.sendStatus(404);
	const session = await createSession(user.uuid);
	if (!session) return res.sendStatus(500);
	return res.send(session);
});
