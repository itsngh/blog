import { Router, Request, Response } from "express";
import { retrievePost } from "../utils/database";
import { isAuthenticated } from "../middlewares/isAuthenticated";

export const postRoute = Router();

postRoute
	.get("/:uuid", async (req: Request, res: Response) => {
		const post = await retrievePost(req.params.uuid);
		if (!post) res.sendStatus(404);
		else res.send(post);
	})
	.post("/add", async (req: Request, res: Response) => {
		// TODO: implement addPost() in @/utils/database.ts and this route
	});
