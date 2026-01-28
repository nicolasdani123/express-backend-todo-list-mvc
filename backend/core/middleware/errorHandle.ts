import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import AppError from "../error/appError.js";

const errorHandle: ErrorRequestHandler = (error, req, res, next) => {
  // Log para auxiliar diagnóstico (apenas server-side)
  console.error(error?.stack ?? error);

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

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // Tratamento de códigos comuns do Prisma para respostas mais claras
    if (error.code === "P2002") {
      return res.status(409).json({
        ...baseResponse,
        message: "Dado já existente",
        code: 409,
        timestamp: new Date().toISOString(),
      });
    }

    if (error.code === "P2003") {
      return res.status(400).json({
        ...baseResponse,
        message: "Violação de integridade referencial",
        code: 400,
        timestamp: new Date().toISOString(),
      });
    }

    if (error.code === "P2025") {
      return res.status(404).json({
        ...baseResponse,
        message: "Registro relacionado não encontrado",
        code: 404,
        timestamp: new Date().toISOString(),
      });
    }
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
