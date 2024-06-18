import { Router, Request, Response } from "express";

const logoutRoute = Router();

logoutRoute.post("/", (req: Request, res: Response) => {
	return res.sendStatus(200);
	// !: https://stackoverflow.com/a/14587231
	// TODO: actually implement this, and invalidateToken() in @/utils/authenticate.ts
});
