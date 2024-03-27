import { Router } from 'express'
import {
	
	getAllOrders,
	createOrder,
	getOrderById,
	deleteOrder,
	
} from '../controllers/order.controller.js'

const router = Router()

router.get('/orders', getAllOrders)
router.post('/orders', createOrder)
router.get('/orders/:id', getOrderById)
router.delete('/orders/delete/:id', deleteOrder)
// router.put('/product/update/:id', updateProduct)
// router.get('/products/category/:category', getProductByCategory)
// router.get('/products/price/:sortOrder', getProductsSortedByPrice)

export default router