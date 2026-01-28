import {
  idUserSchema,
  createUserSchema,
  updateUserSchema,
} from "../schemas/user.schemas.js";
import UserService from "../service/user.service.js";
import { Request, Response } from "express";

class UserController {
  constructor(private readonly service: UserService) {}

  async findAll(req: Request, res: Response): Promise<void> {
    const users = await this.service.findAll();
    res.status(200).json(users);
  }

  async findById(req: Request, res: Response): Promise<void> {
    const idParsed = idUserSchema.parse(Number(req.params.id));
    const user = await this.service.findById(idParsed);
    res.status(200).json(user);
  }

  async create(req: Request, res: Response): Promise<void> {
    const payload = createUserSchema.parse(req.body);
    const user = await this.service.create(payload);
    res.status(201).json(user);
  }

  async update(req: Request, res: Response): Promise<void> {
    const idParsed = idUserSchema.parse(Number(req.params.id));
    const bodyParsed = updateUserSchema.parse(req.body);
    const user = await this.service.update(idParsed, bodyParsed);
    res.status(200).json(user);
  }

  async delete(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const idParsed = idUserSchema.parse(id);

    await this.service.delete(idParsed);

    res.status(204).send();
  }
}

export default UserController;
