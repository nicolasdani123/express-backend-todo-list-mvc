import { Router } from "express";
import {getAllUsers, getById,createUser,updateUser,deleteUser} from "../controller/userController"

const router = Router();

router.get("",getAllUsers)
router.get("/:id",getById)
router.post("",createUser)
router.put("/:id",updateUser)
router.delete("/:id",deleteUser)

export default router