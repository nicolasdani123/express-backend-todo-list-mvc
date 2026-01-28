import { prisma, TaskStatus } from "../../../../prisma/client.js";
import type {
  createTaskInput,
  idTaskInput,
  responseTaskInput,
  updateTaskInput,
} from "../schemas/task.schemas.js";
import { Prisma } from "@prisma/client";

class TaskRepository {
  async findAll(): Promise<responseTaskInput[]> {
    return prisma.task.findMany({
      select: {
        id: true,
        title: true,
        status: true,
        userId: true,
      },
    });
  }

  async findById(id: idTaskInput): Promise<responseTaskInput | null> {
    return prisma.task.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        status: true,
        userId: true,
      },
    });
  }

  async create(task: createTaskInput): Promise<responseTaskInput> {
    const data = {
      title: task.title, // obrigatório
      status: task.status ?? TaskStatus.PENDENTE, // valor padrão
      userId: task.userId,
    } as Prisma.TaskCreateInput | any;

    return prisma.task.create({
      data,
      select: {
        id: true,
        title: true,
        status: true,
        userId: true,
      },
    });
  }


  async update(id: idTaskInput, task: updateTaskInput): Promise<responseTaskInput> {
    const data: Prisma.TaskUpdateInput = {};

    if (task.title !== undefined) data.title = task.title;
    if (task.status !== undefined) data.status = task.status;

    return prisma.task.update({
      where: { id },
      data,
      select: {
        id: true,
        title: true,
        status: true,
        userId: true,
      },
    });
  }

  async delete(id: idTaskInput): Promise<void> {
    await prisma.task.delete({
      where: { id },
    });
  }
}

export default TaskRepository;
