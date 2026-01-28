import {
  idTaskSchema,
  createTaskSchema,
  updateTaskSchema,
} from "../schemas/task.schemas.js";
import TaskService from "../services/task.services.js";
import type { Request, Response } from "express";

class TaskController {
  constructor(private readonly service: TaskService) {}

  async findAll(req: Request, res: Response): Promise<void> {
    const tasks = await this.service.findAll();
    res.json(tasks);
  }

  async findById(req: Request, res: Response): Promise<void> {
    const id = idTaskSchema.parse(Number(req.params.id));

    const task = await this.service.findById(id);

    res.json(task);
  }

  async create(req: Request, res: Response): Promise<void> {
    const payload = createTaskSchema.parse(req.body);

    const task = await this.service.create(payload);

    res.status(201).json(task);
  }

  async update(req: Request, res: Response): Promise<void> {
    const id = idTaskSchema.parse(Number(req.params.id));
    const payload = updateTaskSchema.parse(req.body);

    const task = await this.service.update(id, payload);

    res.json(task);
  }

  async delete(req: Request, res: Response): Promise<void> {
    const id = idTaskSchema.parse(Number(req.params.id));

    await this.service.delete(id);

    res.status(204).send();
  }
}

export default TaskController;
