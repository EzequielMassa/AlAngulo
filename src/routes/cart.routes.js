import { Router } from 'express'
import { clearUserCart, getUserCart } from '../controllers/cart.controller.js'

const router = Router()

router.get('/cart/user/:userId', getUserCart)
router.post('/cart/checkout/user/:userId', clearUserCart)

export default router
