import TaskRepository from "../repository/task.repository.js";
import UserRepository from "../../users/repository/user.repository.js";
import AppError from "../../../core/error/appError.js";
import { responseTaskSchema } from "../schemas/task.schemas.js";
import type {
  createTaskInput,
  updateTaskInput,
  responseTaskInput,
  idTaskInput,
} from "../schemas/task.schemas.js";

class TaskService {
  private readonly userRepository = new UserRepository();

  constructor(private readonly repository: TaskRepository) {}

  async findAll(): Promise<responseTaskInput[]> {
    const tasks = await this.repository.findAll();
    return responseTaskSchema.array().parse(tasks);
  }

  async findById(id: idTaskInput): Promise<responseTaskInput> {
    const task = await this.repository.findById(id);
    if (!task) {
      throw new AppError("Tarefa não encontrada", 404);
    }
    return responseTaskSchema.parse(task);
  }

  async create(data: createTaskInput): Promise<responseTaskInput> {
    const user = await this.userRepository.findById(data.userId);
    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    const task = await this.repository.create(data);
    return responseTaskSchema.parse(task);
  }

  async update(
    id: idTaskInput,
    data: updateTaskInput,
  ): Promise<responseTaskInput> {
    if (Object.keys(data).length === 0) {
      throw new AppError("Nenhum dado para atualizar", 400);
    }

    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new AppError("Tarefa não encontrada", 404);
    }

    const task = await this.repository.update(id, data);
    return responseTaskSchema.parse(task);
  }

  async delete(id: idTaskInput): Promise<void> {
    return this.deleteById(id);
  }

  async deleteById(id: idTaskInput): Promise<void> {
    await this.findById(id);
    await this.repository.delete(id);
  }
}
export default TaskService;