import { CartModel } from '../models/Cart.model.js'

export const getUserCart = async (req, res) => {
	try {
		const { userId } = req.params

		const userCart = await CartModel.findOne({ user: userId })
			.populate({
				path: 'bookings',
				populate: { path: 'soccerField', select: '-createdAt -updatedAt' },
				select: '-user -createdAt -updatedAt',
			})
			.populate({
				path: 'orders',
				populate: { path: 'product', select: '-createdAt -updatedAt' },
				select: '-user -createdAt -updatedAt',
			})
			.select('-createdAt -updatedAt')

		if (!userCart) {
			return res
				.status(404)
				.json({ message: `User with Id : ${userId} not found` })
		}

		userCart.getCartTotal()
		res.status(200).json({ data: userCart })
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

export const clearUserCart = async (req, res) => {
	const { userId } = req.params
	try {
		const cart = await CartModel.findOne({ user: userId })
		if (!cart) {
			return res.status(404).json({ message: 'Carrito no encontrado.' })
		}

		cart.orders = []
		cart.bookings = []
		cart.total = 0

		await cart.save()
		res.status(200).json({ message: 'Pago correctamente efectuado' })
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}
