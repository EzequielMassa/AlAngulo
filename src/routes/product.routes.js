import { Router } from 'express'
import {
	createProduct,
	deleteProduct,
	getAllProducts,
	getProductByCategory,
	getProductById,
	getProductsSortedByPrice,
	updateProduct,
} from '../controllers/product.controllers.js'
import { isAdmin, verifyToken } from '../middlewares/authJwt.js'
const router = Router()

router.get('/products', getAllProducts)
router.post('/products', [verifyToken, isAdmin], createProduct)
router.get('/product/:id', getProductById)
router.put('/product/update/:id', [verifyToken, isAdmin], updateProduct)
router.delete('/product/delete/:id', [verifyToken, isAdmin], deleteProduct)
router.get('/products/category/:category', getProductByCategory)
router.get('/products/price', getProductsSortedByPrice)

export default router
