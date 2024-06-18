import { Request, Response, NextFunction } from "express";
import { validateToken } from "../utils/authenticate";
import log from "../utils/logger";

export function isAuthenticated(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const auth_header = req.headers.authorization;
	if (!auth_header) return res.sendStatus(401);
	const token = auth_header.split(" ")[1];
	if (!token) return res.sendStatus(401);
	const user = validateToken(token);
	if (!user) return res.sendStatus(401);
	res.locals.user = user;
	next();
}
