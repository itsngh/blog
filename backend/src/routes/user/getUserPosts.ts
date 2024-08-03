import { Router, Request, Response } from "express";
import { validateID } from "../../utils/sanitiser";

export const getUserPosts = Router();

getUserPosts.get("/:term/posts", async (req: Request, res: Response) => {
	const term = req.params.term;
	let posts = null;
	switch (validateID(term)) {
		case "username":
			break;
		case "uuid":
			posts = await prisma.post.findMany({
				where: {
					author_uuid: term,
				},
			});
			break;
	}
	if (!posts) return res.sendStatus(404);
	return res.send(posts);
});
