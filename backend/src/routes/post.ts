import { Router, Request, Response } from "express";
import { addPost } from "./post/addPost";
import { getPost } from "./post/getPost";
import { updatePost } from "./post/updatePost";

export const postRoute = Router();

postRoute.use("/add", addPost);
postRoute.use("/", getPost);
postRoute.use("/", updatePost);
