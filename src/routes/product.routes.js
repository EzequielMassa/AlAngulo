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

const router = Router()

router.get('/products', getAllProducts)
router.post('/products', createProduct)
router.get('/product/:id', getProductById)
router.put('/product/update/:id', updateProduct)
router.delete('/product/delete/:id', deleteProduct)
router.get('/products/category/:category', getProductByCategory)
router.get('/products/price/', getProductsSortedByPrice)

export default router
