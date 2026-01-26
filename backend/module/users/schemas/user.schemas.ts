import { z } from "zod";

const idUserSchema = z.int().min(1).positive();
const nameUserSchema = z.string().min(1);
const emailUserSchema = z.string().email().min(1);

const createUserSchema = z.object({
  name: nameUserSchema,
  email: emailUserSchema,
});

const updateUserSchema = createUserSchema.partial();

export const responseUserSchema = z.object({
  id: idUserSchema,
  name: nameUserSchema,
  email: emailUserSchema,
});

export type createUserInput = z.infer<typeof createUserSchema>;
export type updateUserInput = z.infer<typeof updateUserSchema>;
export type responseUserInput = z.infer<typeof responseUserSchema>;
export type idUserInput = z.infer<typeof idUserSchema>;
