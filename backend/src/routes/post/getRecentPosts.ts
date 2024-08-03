import { Router, Request, Response } from "express";
import log from "../../utils/logger";

export const recentPosts = Router();

recentPosts.get("/recent", async (req: Request, res: Response) => {
	const recentPosts = await prisma.post.findMany({
		orderBy: {
			created_at: "desc",
		},
		take: 20,
	});
	return res.send(recentPosts);
});
