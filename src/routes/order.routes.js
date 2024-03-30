import { Router } from 'express'
import {
	createOrder,
	deleteOrder,
	getAllOrders,
	getOrderById,
} from '../controllers/order.controller.js'
import { isAdmin, verifyToken } from '../middlewares/authJwt.js'

const router = Router()

router.get('/orders', [verifyToken, isAdmin], getAllOrders)
router.post('/orders', createOrder)
router.get('/order/:id', getOrderById)
router.delete('/order/delete/:id', deleteOrder)

export default router
