import { Router, Request, Response } from "express";

const logoutRoute = Router();

logoutRoute.post("/", (req: Request, res: Response) => {
	// !: https://stackoverflow.com/a/14587231
	// TODO: actually implement this, and invalidateToken() in @/utils/authenticate.ts
});
