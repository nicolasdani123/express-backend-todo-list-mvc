import { prisma, TaskStatus } from "../../../../prisma/client.js";
import type {
  createTaskInput,
  idTaskInput,
  responseTaskInput,
  updateTaskInput,
} from "../schemas/task.schemas.js";
import type { UpdateTaskData } from "../../../core/types/updateTaskData.js";
class TaskRepository {
  async findAll(): Promise<responseTaskInput[]> {
    return await prisma.task.findMany({
      select: {
        id: true,
        title: true,
        status: true,
        userId: true,
      },
    });
  }

  async findById(id: idTaskInput): Promise<responseTaskInput | null> {
    return await prisma.task.findUnique({
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
    if (!task.userId) {
      throw new Error("userId is required to create a task");
    }
    const data = {
      title: task.title,
      status: task.status ?? TaskStatus.PENDENTE,
      userId: task.userId,
    };

    return await prisma.task.create({
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

    const data: UpdateTaskData = {}
    if (task.title !== undefined) data.title = task.title;
    if (task.status !== undefined) data.status = task.status;

    return await prisma.task.update({
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