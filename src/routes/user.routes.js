import { Router } from 'express'
import {
	createUser,
	deleteUser,
	getUser,
	getUserEmail,
	getUsers,
	login,
	updateUser,
} from '../controllers/user.controllers.js'
import { isAdmin, verifyToken } from '../middlewares/authJwt.js'
import {
	checkExistingRole,
	checkExistingUser,
} from '../middlewares/verifySignUp.js'
const router = Router()
router.get('/user/:id', getUser)
router.get('/users', [verifyToken, isAdmin], getUsers)
router.get('/user/email/:email', getUserEmail)
router.post('/register', [checkExistingUser, checkExistingRole], createUser)
router.delete('/user/:id', [verifyToken, isAdmin], deleteUser)
router.put('/user/:id', [verifyToken, isAdmin], updateUser)
router.post('/login', login)
export default router
