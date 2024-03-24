import { Router } from "express";
import {getUser,getUsers} from "../controllers"
const router = Router()
router.get('/user',getUser)
router.get('/users',getUsers)
router.post()
export default router