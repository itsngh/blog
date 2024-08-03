import { Router, Request, Response, NextFunction } from "express";
import { retrieveSession } from "../utils/cache";

export const sessionRoute = Router();

sessionRoute.use(
	"/",
	async (req: Request, res: Response, next: NextFunction) => {
		const sessionHeader = req.headers.authorization;
		if (!sessionHeader) return res.sendStatus(401);
		const sessionObject = await retrieveSession(sessionHeader);
		if (!sessionObject) return res.sendStatus(401);
		if (parseInt(sessionObject.expiresAt) < Date.now())
			return res.sendStatus(401);
		res.locals.session = sessionObject;
		return next();
	}
);
