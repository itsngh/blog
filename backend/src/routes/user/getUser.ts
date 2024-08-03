import { Router, Request, Response } from "express";
import { validateID } from "../../utils/sanitiser";

export const getUser = Router();

getUser.get("/:term", async (req: Request, res: Response) => {
	const term = req.params.term;
	let user = null;
	switch (validateID(term)) {
		case "username":
			user = await prisma.user.findUnique({
				where: {
					username: term,
				},
			});
			break;
		case "uuid":
			user = await prisma.user.findUnique({
				where: {
					uuid: term,
				},
			});
			break;
		default:
			return res.sendStatus(400);
	}
	if (!user) return res.sendStatus(404);
	return res.send(user);
});
