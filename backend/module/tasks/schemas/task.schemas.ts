import { TaskStatus } from "@prisma/client";
import { z } from "zod";

export const idTaskSchema = z.number().int().min(1);
const idUserSchema = z.number().int().min(1);
const titleTaskSchema = z.string().min(1);

const statusInputSchema = z
  .preprocess((val) => (typeof val === "string" ? val.toLowerCase() : val),
    z.enum(["concluido", "pendente"])
  )
  .transform((value) =>
    value === "concluido" ? TaskStatus.CONCLUIDO : TaskStatus.PENDENTE,
  );

const statusResponseSchema = z.nativeEnum(TaskStatus);

export const createTaskSchema = z.object({
  title: titleTaskSchema,
  status: statusInputSchema.optional(),
  userId: idUserSchema,
});

export const updateTaskSchema = z
  .object({
    title: titleTaskSchema.optional(),
    status: statusInputSchema.optional(),
  })
  .refine((data) => Object.keys(data).length > 0,
   { message: "At least one field is required" });

export const responseTaskSchema = z.object({
  id: idTaskSchema,
  title: titleTaskSchema,
  status: statusResponseSchema,
  userId: idUserSchema,
});

export type createTaskInput = z.infer<typeof createTaskSchema>;
export type updateTaskInput = z.infer<typeof updateTaskSchema>;
export type responseTaskInput = z.infer<typeof responseTaskSchema>;
export type idTaskInput = z.infer<typeof idTaskSchema>;
export type idUserInput = z.infer<typeof idUserSchema>;
