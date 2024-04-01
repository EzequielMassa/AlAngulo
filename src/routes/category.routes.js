import { Router } from 'express'
import {
	createCategory,
	deleteCategory,
	getAllCategories,
	updateCategory,
} from '../controllers/category.controllers.js'
import { isAdmin, verifyToken } from '../middlewares/authJwt.js'

const router = Router()

router.get('/categories', getAllCategories)
router.post('/category', [verifyToken, isAdmin], createCategory)
router.delete('/category/delete/:id', [verifyToken, isAdmin], deleteCategory)
router.put('/category/update/:id', [verifyToken, isAdmin], updateCategory)

export default router
