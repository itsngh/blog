import { Router, Request, Response } from "express";
import { retrieveUser } from "../utils/database";
import { isAuthenticated } from "../middlewares/isAuthenticated";

export const userRoute = Router();

userRoute
	.get("/:term", async (req: Request, res: Response) => {
		let term = req.params.term;
		if (req.params.term.startsWith("@")) term = term.substring(1);
		const user = await retrieveUser(term, false);
		if (!user) res.sendStatus(404);
		else res.send(user);
	})
	.get("/:term/posts", async (req: Request, res: Response) => {
		let term = req.params.term;
		if (req.params.term.startsWith("@")) term = term.substring(1);
		const user = await retrieveUser(term, true);
		if (!user) res.sendStatus(404);
		else res.send(user);
	})
	.patch("/:term", isAuthenticated, async (req: Request, res: Response) => {
		// TODO: implement updateUser() in @/utils/database.ts and this route
	});
