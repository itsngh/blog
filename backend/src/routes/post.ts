import { Router, Request, Response } from "express";
import { retrievePost, addPost } from "../utils/database";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import log from "../utils/logger";
import { validateID } from "../utils/sanitiser";

export const postRoute = Router();

postRoute
	.get("/:uuid", async (req: Request, res: Response) => {
		const uuid = req.params.uuid;
		if (validateID(uuid) != "uuid") return res.sendStatus(400);
		const post = await retrievePost(uuid);
		if (!post) return res.sendStatus(404);
		return res.json(post);
	})
	.post("/add", isAuthenticated, async (req: Request, res: Response) => {
		let { title, description, content } = req.body;
		const user = res.locals.user;
		const post = await addPost(title, user, description, content);
		if (!post) {
			log("UNABLE TO ADD POST", 2);
			return res.sendStatus(500);
		}
	});
