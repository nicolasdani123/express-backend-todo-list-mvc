import AppError from "../../../core/error/appError.js";
import UserRepository from "../repository/user.repository.js";
import {
  createUserInput,
  idUserInput,
  responseUserInput,
  responseUserSchema,
  updateUserInput,
} from "../schemas/user.schemas.js";

class UserService {
  constructor(private readonly repository: UserRepository) {}

  async findAll(): Promise<responseUserInput[]> {
    const users = await this.repository.findAll();
    return responseUserSchema.array().parse(users);
  }

  async findById(id: idUserInput): Promise<responseUserInput> {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    return responseUserSchema.parse(user);
  }

  async create(data: createUserInput): Promise<responseUserInput> {
    const user = await this.repository.create(data);
    return responseUserSchema.parse(user);
  }

  async update(id: idUserInput,data: updateUserInput,): Promise<responseUserInput> {
    const user = await this.repository.update(id, data);
    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }
    return responseUserSchema.parse(user);
  }

  async delete(id: idUserInput): Promise<void> {
    await this.deleteById(id);
  }

  private async deleteById(id: idUserInput): Promise<void> {
    const existing = await this.findById(id)
    if (!existing) throw new AppError("Usuario não encontrado", 404);

    await this.repository.delete(id);
  }
}

export default UserService;
