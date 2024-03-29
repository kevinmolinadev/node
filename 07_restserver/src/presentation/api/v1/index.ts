import { Router } from "express";
import { Todo } from "./routes/todos";

const router = Router();

export const routes: Router[] = [
    router.use("/todos", Todo.routes),
]