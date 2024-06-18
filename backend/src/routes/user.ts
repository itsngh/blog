import { Router } from "express";
import { getUser } from "./user/getUser";
import { getUserPosts } from "./user/getUserPosts";
import { updateUser } from "./user/updateUser";

export const userRoute = Router();

userRoute.use("/", getUser);
userRoute.use("/", getUserPosts);
userRoute.use("/", updateUser);
