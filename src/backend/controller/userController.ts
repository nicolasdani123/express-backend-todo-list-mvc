import { getCurrentDate } from "../config/connection";
import {
  createUserService,
  getAllService,
  getByIdService,
  updateUserService,
  deleteUserService,
} from "../services/userServices";
import type { Request, Response } from "express";

const getAllUsers = async (req: Request, res: Response) => {
  const date = await getCurrentDate();
  try {
    const users = await getAllService();

    return res.status(200).json({
      success: true,
      message: "Usuarios encontrados com sucesso.",
      data: users,
      timestamp: date,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Error desconhecido";

    if (errorMessage === "Usuario não encontrado.") {
      return res.status(404).json({
        success: false,
        message: errorMessage,
        timestamp: date,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Error no servidor.",
      timestamp: date,
    });
  } finally {
    console.log(`[GET] /users | IP: ${req.ip} | ${date}`);
  }
};

const getById = async (req: Request, res: Response) => {
  const date = await getCurrentDate();
  try {
    const id = Number(req.params.id);
    const user = await getByIdService(id);
    res.status(200).json({
      success: true,
      message: "Usuario encontrado.",
      data: user,
      timestamp: date,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Error desconhecido";
    if (errorMessage === "Id invalido.") {
      return res.status(400).json({
        success: false,
        message: errorMessage,
        timestamp: date,
      });
    }
    if (errorMessage.includes("não foi encontrado")) {
      return res.status(404).json({
        success: false,
        message: errorMessage,
        timestamp: date,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Error no servidor.",
      timestamp: date,
    });
  }
};

const createUser = async (req: Request, res: Response) => {
  const date = await getCurrentDate();
  try {
    const body = req.body;
    const user = await createUserService(body);
    return res.status(201).json({
      success: true,
      message: "Usuario criado.",
      data: user,
      timestamp: date,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Error desconhecido";
    if (errorMessage === "Name ou email são obrigatorios.") {
      return res.status(400).json({
        success: false,
        message: errorMessage,
        timestamp: date,
      });
    }
    if (errorMessage === "Usuario não encontrado.") {
      return res.status(404).json({
        success: false,
        message: errorMessage,
        timestamp: date,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Error no servidor.",
      timestamp: date,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  const date = await getCurrentDate();

  try {
    const id = Number(req.params.id);
    const user = req.body;
    const result = await updateUserService(id, user);

    res.status(200).json({
      success: true,
      message: "Usuario atualizado com sucesso.",
      data: result,
      timestamp: date,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Error desconhecido";
    if (errorMessage === "Id invalido" || errorMessage === "Dados invalidos") {
      return res.status(400).json({
        success: false,
        message: errorMessage,
        timestamp: date,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Error no servidor",
      timestamp: date,
    });
  } finally {
    console.log(`[PUT] /users/:id | IP: ${req.ip} | ${date}`);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const date = await getCurrentDate();
  try {
    const id = Number(req.params.id);
    const result = await deleteUserService(id);
    return res.status(200).json({
      success: true,
      message: "Usuario removido com succeso",
      data: result,
      timestamp: date,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Error desconhecido";
    if (errorMessage === "Id invalido") {
      return res.status(400).json({
        success: false,
        message: errorMessage,
        timestamp: date,
      });
    }
    if (errorMessage === "Usuario não encontrado ou ja foi removido") {
      return res.status(404).json({
        success: false,
        message: errorMessage,
        timestmap: date,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Error no servidor",
      timestamp: date,
    });
  } finally {
    console.log(`[GET] /users/:id IP${req.ip} | ${date}`);
  }
};
export { getAllUsers, getById, createUser, updateUser, deleteUser };
