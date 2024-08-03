import { Router, Request, Response } from "express";
import { validateID } from "../../utils/sanitiser";

export const getPost = Router();

getPost.get("/:uuid", async (req: Request, res: Response) => {
	const uuid = req.params.uuid;
	if (validateID(uuid) != "uuid") return res.sendStatus(400);
	const post = prisma.post.findUnique({
		where: {
			uuid: uuid,
		},
	});
	if (!post) return res.sendStatus(404);
	return res.send(post);
});
