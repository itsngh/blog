import { Router, Request, Response } from "express";
import { validateID } from "../../utils/sanitiser";
import log from "../../utils/logger";
export const updateUser = Router();

updateUser.patch("/:term", (req: Request, res: Response) => {});
