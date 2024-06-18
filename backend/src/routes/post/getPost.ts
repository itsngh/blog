import { Router, Request, Response } from "express";
import { retrievePost, addPost } from "../../utils/database";
import { isAuthenticated } from "../../middlewares/isAuthenticated";
import log from "../../utils/logger";
import { validateID } from "../../utils/sanitiser";

export const getPost = Router();

getPost.get("/:uuid", async (req: Request, res: Response) => {
	const uuid = req.params.uuid;
	if (validateID(uuid) != "uuid") return res.sendStatus(400);
	const post = await retrievePost(uuid);
	if (!post) return res.sendStatus(404);
	return res.json(post);
});
