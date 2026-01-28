import { Router } from "express";
import UserRepository from "../../module/users/repository/user.repository.js";
import UserService from "../../module/users/service/user.service.js";
import UserController from "../../module/users/controller/user.controller.js";
import asyncHandle from "../middleware/asyncHandle.js";

const repository = new UserRepository();
const service = new UserService(repository);
const controller = new UserController(service);

const router = Router();

router.get("/users", asyncHandle(controller.findAll.bind(controller)));
router.get("/users/:id",asyncHandle(controller.findById.bind(controller)))
router.put("/users/:id",asyncHandle(controller.update.bind(controller)))
router.post("/users",asyncHandle(controller.create.bind(controller)))
router.delete("/users/:id",asyncHandle(controller.delete.bind(controller)))

export default router
