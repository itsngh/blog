import { Router, Request, Response } from "express";
import { sessionRoute } from "../../middlewares/authenticateSession";
export const addPost = Router();

addPost.post("/add", sessionRoute, async (req: Request, res: Response) => {
	const { title, content } = req.body;
	const session = res.locals.session;
	if (!session.uuid) return res.sendStatus(401);
	const post = await prisma.post.create({
		data: {
			author_uuid: session.uuid,
			title: title,
			content: content,
		},
	});
	if (!post) return res.sendStatus(500);
	return res.send(post);
});
