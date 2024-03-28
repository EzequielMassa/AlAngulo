import { CartModel } from '../models/Cart.model.js'

export const getUserCart = async (req, res) => {
	try {
		const { userId } = req.params

		const userCart = await CartModel.findOne({ user: userId }).populate({
			path: 'bookings',
			populate: { path: 'soccerField' },
		})

		res.status(200).json({ data: userCart })
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}