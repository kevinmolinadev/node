import { Router } from "express"
import { Route as Auth } from "./routes/auth/auth.route";
import { Route as User } from "./routes/user/user.route";

const router = Router();

export const routes = [
    router.use("/auth", Auth.routes),
    router.use("/user", User.routes),
]