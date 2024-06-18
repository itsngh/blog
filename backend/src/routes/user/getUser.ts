import { Router, Request, Response } from "express";
import { validateID } from "../../utils/sanitiser";
import { retrieveUser } from "../../utils/database";

export const getUser = Router();

getUser.get("/:term", async (req: Request, res: Response) => {
	let term = req.params.term;
	if (term.startsWith("@")) {
		term = term.substring(1);
	}
	let user;
	switch (validateID(term)) {
		case "uuid":
			user = await retrieveUser(term, { type: "uuid" });
			break;
		case "username":
			user = await retrieveUser(term, { type: "username" });
			break;
		default:
			return res.sendStatus(400);
	}
	if (!user) return res.sendStatus(404);
	return res.send(user);
});
