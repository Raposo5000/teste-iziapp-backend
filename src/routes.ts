import { Router } from "express";
import UserController from "./controllers/user.controller";
import authMiddleware from "./middlewares/auth";
import TaskController from "./controllers/task.controllers";

const routes = Router();

routes.post("/register", UserController.register);

routes.post("/login", UserController.login);

routes.post("/tasks", authMiddleware, TaskController.createTask);

routes.get("/tasks", authMiddleware, TaskController.getUserTasks);

routes.patch("/tasks", authMiddleware, TaskController.updateTask);

routes.delete("/tasks/:taskId", authMiddleware, TaskController.deleteTask);

export default routes;
