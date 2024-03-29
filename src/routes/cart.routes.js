import { Router } from 'express'
import { getUserCart } from '../controllers/cart.controller.js'

const router = Router()

router.get('/cart/user/:userId', getUserCart)

export default router
