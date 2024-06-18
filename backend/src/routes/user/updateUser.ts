import { Router, Request, Response } from "express";
import { isAuthenticated } from "../../middlewares/isAuthenticated";
import { validateID } from "../../utils/sanitiser";
import log from "../../utils/logger";
import {
	retrieveUser,
	updateUser as databaseUpdateUser,
} from "../../utils/database";

export const updateUser = Router();

updateUser.patch(
	"/:term",
	isAuthenticated,
	async (req: Request, res: Response) => {
		let term = req.params.term;
		if (term.startsWith("@")) {
			term = term.substring(1);
		}
		const { username, bio } = req.body;
		if (validateID(username) != "username") return res.sendStatus(400);
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
		if (!user) return res.sendStatus(400);
		if (user.uuid != res.locals.user.uuid) return res.sendStatus(403);
		const updatedUser = await databaseUpdateUser(user, username, bio);
		if (!updatedUser) return res.sendStatus(400);
		return res.send(updatedUser);
	}
);
