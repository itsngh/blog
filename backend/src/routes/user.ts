import { Router, Request, Response } from "express";
import { retrieveUserSecret } from "../utils/database";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { validateID } from "../utils/sanitiser";

export const userRoute = Router();

userRoute
	.get("/:term", async (req: Request, res: Response) => {
		let term = req.params.term;
		if (term.startsWith("@")) {
			term = term.substring(1);
		}
		let user;
		switch (validateID(term)) {
			case "uuid":
				user = await retrieveUserSecret(term, { type: "uuid" });
				break;
			case "username":
				user = await retrieveUserSecret(term, { type: "username" });
				break;
			default:
				return res.sendStatus(400);
		}
		if (!user) return res.sendStatus(404);
		return res.send(user);
	})
	.get("/:term/posts", async (req: Request, res: Response) => {
		let term = req.params.term;
		if (!term) return res.sendStatus(400);
		let userWithPosts;
		switch (validateID(term)) {
			case "uuid":
				userWithPosts = await retrieveUserSecret(term, {
					type: "uuid",
				});
				break;
			case "username":
				userWithPosts = await retrieveUserSecret(term, {
					type: "username",
				});
				break;
			default:
				return res.sendStatus(400);
		}
		if (!userWithPosts) return res.sendStatus(404);
		return res.send(userWithPosts);
	})
	.patch("/:term", isAuthenticated, async (req: Request, res: Response) => {
		// TODO: implement updateUser() in @/utils/database.ts and this route
	});
