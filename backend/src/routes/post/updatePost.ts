import { Router, Request, Response } from "express";
import {
	retrievePost,
	updatePost as databaseUpdatePost,
} from "../../utils/database";
import { isAuthenticated } from "../../middlewares/isAuthenticated";
import { validateID } from "../../utils/sanitiser";

export const updatePost = Router();

updatePost.patch(
	"/:uuid",
	isAuthenticated,
	async (req: Request, res: Response) => {
		const { title, description, content } = req.body;
		const uuid = req.params.uuid;
		if (validateID(uuid) != "uuid") return res.sendStatus(400);
		const post = await retrievePost(uuid);
		if (!post) return res.sendStatus(404);
		if (post.author_uuid != res.locals.user!.uuid)
			return res.sendStatus(403);
		const updatedPost = await databaseUpdatePost(
			post,
			title,
			description,
			content
		);
		if (!updatedPost) return res.sendStatus(500);
		return res.send(updatedPost);
	}
);
