import { Router } from "express";
import {getUser,getUsers,getUserEmail,createUser,deleteUser,updateUser,login} from "../controllers/user.controllers.js"
const router = Router()
router.get('/user/:id',getUser)
router.get('/users',getUsers)
router.get('/user/:email',getUserEmail)
router.post('/users',createUser)
router.delete('/user/:id',deleteUser)
router.put('/user/:id',updateUser)

export default router