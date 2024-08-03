import { Router } from "express";
const routes = Router();
export default routes;

/**
 * USER ROUTES
 */
import { getUser } from "./user/getUser";
import { getUserPosts } from "./user/getUserPosts";
import { updateUser } from "./user/updateUser";
routes.use("/user", getUser);
routes.use("/user", getUserPosts);
routes.use("/user", updateUser);
/**
 * AUTH ROUTES
 */
import { loginRoute } from "./auth/login";
import { registerRoute } from "./auth/register";
import { logoutRoute } from "./auth/logout";
routes.use("/auth/login", loginRoute);
routes.use("/auth/register", registerRoute);
routes.use("/auth/logout", logoutRoute);

/**
 * POST ROUTES
 */
import { addPost } from "./post/addPost";
import { getPost } from "./post/getPost";
import { updatePost } from "./post/updatePost";
import { recentPosts } from "./post/getRecentPosts";
routes.use("/post", recentPosts);
routes.use("/post", addPost);
routes.use("/post", getPost);
routes.use("/post", updatePost);
