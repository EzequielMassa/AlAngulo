import { Router } from "express";
import {getUser,getUsers,getUserEmail,createUser,deleteUser,updateUser,login} from "../controllers/user.controllers.js"
import { verifyToken,isAdmin } from "../middlewares/authJwt.js";
import { checkExistingRole,checkExistingUser } from "../middlewares/verifySignUp.js";
const router = Router()
router.get('/user/:id',getUser)
router.get('/users',getUsers)
router.get('/userEmail/:email',getUserEmail)
router.post('/users',[checkExistingUser,checkExistingRole],createUser)
router.delete('/user/:id',[verifyToken,isAdmin],deleteUser)
router.put('/user/:id',[verifyToken,isAdmin],updateUser)
router.post("/login",login)
export default router