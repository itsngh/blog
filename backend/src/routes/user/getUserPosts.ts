import { Router, Request, Response } from "express";
import { validateID } from "../../utils/sanitiser";
import { retrieveUser } from "../../utils/database";

export const getUserPosts = Router();

getUserPosts.get("/:term/posts", async (req: Request, res: Response) => {
	let term = req.params.term;
	if (!term) return res.sendStatus(400);
	let userWithPosts;
	switch (validateID(term)) {
		case "uuid":
			userWithPosts = await retrieveUser(term, {
				type: "uuid",
				withPosts: true,
			});
			break;
		case "username":
			userWithPosts = await retrieveUser(term, {
				type: "username",
				withPosts: true,
			});
			break;
		default:
			return res.sendStatus(400);
	}
	if (!userWithPosts) return res.sendStatus(404);
	return res.send(userWithPosts);
});
