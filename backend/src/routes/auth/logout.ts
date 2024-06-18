import { Router, Request, Response } from "express";
import { isAuthenticated } from "../../middlewares/isAuthenticated";

export const logoutRoute = Router();

logoutRoute.post("/", isAuthenticated, (req: Request, res: Response) => {
	return res.sendStatus(200);
	// !: https://stackoverflow.com/a/14587231
	// TODO: actually implement this, and invalidateToken() in @/utils/authenticate.ts
});
