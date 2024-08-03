import { Router, Request, Response } from "express";
import { sessionRoute } from "../../middlewares/authenticateSession";
import { validateID } from "../../utils/sanitiser";

export const updatePost = Router();

updatePost.patch(
	"/:uuid",
	sessionRoute,
	async (req: Request, res: Response) => {
		const uuid = req.params.uuid;
		if (validateID(uuid) != "uuid") return res.sendStatus(400);
		const post = await prisma.post.findUnique({
			where: {
				uuid: req.params.uuid,
			},
		});
		if (!post) return res.sendStatus(404);
		if (post.author_uuid != res.locals.uuid) return res.sendStatus(403);
		const { title, content } = req.body;
		const updatedPost = await prisma.post.update({
			where: {
				uuid: req.params.uuid,
			},
			data: {
				title: title,
				content: content,
			},
		});
		if (!updatePost) return res.sendStatus(500);
		return res.send(updatedPost);
	}
);
