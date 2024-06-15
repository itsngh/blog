import { Router, Request, Response } from "express";

export const postRoute = Router();

postRoute
	.post("/", (req: Request, res: Response) => {})
	.get("/:uuid", (req: Request, res: Response) => {});
