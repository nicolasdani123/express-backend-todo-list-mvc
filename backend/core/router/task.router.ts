import { Router } from "express";
import TaskRepository from "../../module/tasks/repository/task.repository.js";
import TaskService from "../../module/tasks/services/task.services.js";
import asyncHandle from "../middleware/asyncHandle.js";
import TaskController from "../../module/tasks/controller/task.controller.js";

const router = Router();

const repository = new TaskRepository();
const service = new TaskService(repository);
const controller = new TaskController(service);

router.get("/task", asyncHandle(controller.findAll.bind(controller)));
router.get("/task/:id", asyncHandle(controller.findById.bind(controller)));
router.post("/task", asyncHandle(controller.create.bind(controller)));
router.patch("/task/:id", asyncHandle(controller.update.bind(controller)));
router.delete("/task/:id", asyncHandle(controller.delete.bind(controller)));
export default router;
