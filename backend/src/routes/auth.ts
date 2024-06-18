import { Router } from "express";
import { loginRoute } from "./auth/login";
import { registerRoute } from "./auth/register";
import { logoutRoute } from "./auth/logout";

export const authRoute = Router();

authRoute.use("/login", loginRoute);
authRoute.use("/register", registerRoute);
authRoute.use("/logout", logoutRoute);
