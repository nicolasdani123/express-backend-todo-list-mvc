import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import AppError from "../error/appError.js";

const errorHandle: ErrorRequestHandler = (error, req, res, next) => {
  const baseResponse = {
    status: false,
    message: "Erro interno no servidor",
    errors: [],
    code: 500,
    timestamp: new Date().toISOString(),
  };

  if (error instanceof ZodError) {
    return res.status(400).json({
      ...baseResponse,
      message: "Dados inválidos",
      code: 400,
      errors: error.issues.map((i) => ({
        field: i.path.join("."),
        message: i.message,
      })),
      timestamp: new Date().toISOString(),
    });
  }
  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2002"
  ) {
    return res.status(409).json({
      ...baseResponse,
      message: "Dado já existente",
      code: 409,
      timestamp: new Date().toISOString(),
    });
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      ...baseResponse,
      message: error.message,
      code: error.statusCode,
      timestamp: new Date().toISOString(),
    });
  }

  res.status(500).json(baseResponse);
};

export default errorHandle;
