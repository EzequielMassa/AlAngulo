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
