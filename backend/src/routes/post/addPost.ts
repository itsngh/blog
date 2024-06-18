import { Router, Request, Response } from "express";
import { isAuthenticated } from "../../middlewares/isAuthenticated";
import { addPost as databaseAddPost } from "../../utils/database";
import log from "../../utils/logger";
export const addPost = Router();

addPost.post("/", isAuthenticated, async (req: Request, res: Response) => {
	let { title, description, content } = req.body;
	const user = res.locals.user;
	const post = await databaseAddPost(title, user, description, content);
	if (!post) return res.sendStatus(400);
	res.send(post);
});
