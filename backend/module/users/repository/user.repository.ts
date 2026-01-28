import {
  createUserInput,
  idUserInput,
  responseUserInput,
  updateUserInput,
} from "../schemas/user.schemas.js";
import { prisma } from "../../../../prisma/client.js";
import { Prisma } from "@prisma/client";

class UserRepository {
  async findAll(): Promise<responseUserInput[]> {
    return prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  async findById(id: idUserInput): Promise<responseUserInput | null> {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  async create(user: createUserInput): Promise<responseUserInput> {
    return prisma.user.create({
      data: {
        ...user,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  async update(
    id: idUserInput,
    user: updateUserInput,
  ): Promise<responseUserInput> {
    const data: Prisma.UserUpdateInput = {};

    if (user.name !== undefined) data.name = user.name;
    if (user.email !== undefined) data.email = user.email;

    return prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  async delete(id: idUserInput): Promise<void> {
    await prisma.user.delete({
      where: { id },
    });
  }
}

export default UserRepository;
