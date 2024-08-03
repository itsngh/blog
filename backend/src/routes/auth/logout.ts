import { Router, Request, Response } from "express";
import { sessionRoute } from "../../middlewares/authenticateSession";
import { wipeSession } from "../../utils/cache";
export const logoutRoute = Router();

logoutRoute.post("/", sessionRoute, async (req: Request, res: Response) => {
	// !: https://stackoverflow.com/a/14587231
	// TODO: actually implement this
	// * update sept 03th, 2024: implemented lol.
	/**
	 * it only wipes the session from the server, we need to remove the auth header via the frontend server on the client.
	 */
	const sessionHeader = res.locals.session.session;
	if (await wipeSession(sessionHeader)) {
		return res.sendStatus(200);
	}
	return res.sendStatus(500);
});
