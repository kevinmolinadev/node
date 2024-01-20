import { Router } from "express"
import { Route as Auth } from "./routes/auth/auth.route";
import { Route as User } from "./routes/user/user.route";
import { Route as Category } from "./routes/category/category.route";
import { Route as Product } from "./routes/product/product.route";

const router = Router();

export const routes = [
    router.use("/auth", Auth.routes),
    router.use("/users", User.routes),
    router.use("/categories", Category.routes),
    router.use("/products", Product.routes),
]