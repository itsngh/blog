import { Request, Response, NextFunction } from "express";
import { validateToken } from "../utils/authenticate";

export function isAuthenticated(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const auth_header = req.headers.authorization;
	if (!auth_header) res.sendStatus(401);
	else {
		const token = auth_header.split(" ")[1];
		if (validateToken(token)) next();
		else res.sendStatus(401);
	}
}
