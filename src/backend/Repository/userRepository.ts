import pool from "../config/connection";
import  type { User } from "../types/userInterface";
const getAllRepositoty = async () => {
  const result = await pool.query("SELECT * FROM users ");

  return result.rows;
};

const getByIdRepository = async(id:number)=>{
  
  const result = await pool.query("SELECT * FROM users WHERE id = $1",[id])
  return result.rows[0]
}

const createUserRepository = async(user:User)=>{
  const result = await pool.query("INSERT INTO  users (name,email) VALUES($1,$2) RETURNING*",[user.name,user.email])
  return result.rows[0]

}  


const updateUserRepository = async (id:number,user:User)=>{
  const result = await pool.query("UPDATE  users SET name = $2, email = $3 WHERE id = $1 RETURNING*",[id,user.name,user.email])
  return result.rows[0]
}

const deleteUserRepository = async (id:number)=>{
  const result = await pool.query(`DELETE FROM users WHERE id  = $1 RETURNING *`,[id])
  return result.rows[0]
}
export {getAllRepositoty,getByIdRepository,createUserRepository,updateUserRepository,deleteUserRepository}