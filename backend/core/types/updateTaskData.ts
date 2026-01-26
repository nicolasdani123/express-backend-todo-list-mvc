import { TaskStatus } from "@prisma/client";

export interface UpdateTaskData {
  title?: string;
  status?: TaskStatus;
}