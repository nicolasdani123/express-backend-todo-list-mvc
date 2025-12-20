import {
  getAllRepositoty,
  getByIdRepository,
  createUserRepository,
  updateUserRepository,
  deleteUserRepository,
} from "../Repository/userRepository";
import type { User } from "../types/userInterface";

const getAllService = async () => {
  const result = await getAllRepositoty();

  if (result.length === 0) throw new Error("Usuario não encontrado.");

  return result;
};

const getByIdService = async (id: number) => {
  if (!id || id <= 0) throw new Error("Id invalido.");
  const result = await getByIdRepository(id);
  if (!result) throw new Error(`Usuario ${id} não foi encontrado.`);
  return result;
};

const createUserService = async (user: User) => {
  if (!user.name || !user.email)
    throw new Error("Name ou email são obrigatorios.");

  const result = await createUserRepository(user);
  if (!result) throw new Error("Usuario não encontrado.");
  return result;
};

const updateUserService = async (id: number, user: User) => {
  if (!id || id <= 0) throw new Error("Id invalido");
  if (!user.name || user.email) throw new Error("Dados invalidos");

  const result = await updateUserRepository(id, user);
  if (!result) throw new Error("Usuario não encontrado");
};


const deleteUserService = async (id:number)=>{
  if(!id || id<=0) throw new Error("Id invalido");
  const result= await deleteUserRepository(id)
  if(!result) throw new Error("Usuario não encontrado ou ja foi removido")

    return result

}
export { getAllService, getByIdService, createUserService,updateUserService,deleteUserService};
