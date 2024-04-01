import { CartModel } from '../models/Cart.model.js'
import { ProductModel } from '../models/Product.models.js'
import RoleModel from '../models/Role.model.js'
import { UserModel } from '../models/User.model.js'
import { OrderModel } from '../models/order.model.js'

export const getAllOrders = async (req, res) => {
	try {
		const order = await OrderModel.find().populate({
			path: 'product',
			select: 'name price quantity',
		})

		return res.status(200).json({ data: order })
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}

export const createOrder = async (req, res) => {
	try {
		const user = await UserModel.findById(req.body.user)
		const userState = user.active
		if (!user) return res.status(404).json({ message: 'user not found' })
		
		const userRole = await RoleModel.find({ _id: user.roles })
		const userRoleName = userRole[0].name
		if (userRoleName == 'admin') {
			return res
				.status(400)
				.json({ message: 'The admin cannot create an order' })
		}else if( userState === false){
			return res
				.status(400)
				.json({ message: 'You are a suspended user' })
		}
		const product = await ProductModel.findById(req.body.product)
		if (!product) return res.status(404).json({ message: 'product not found' })

		const quantity = req.body.quantity
		if (!quantity)
			return res.status(400).json({ message: 'quantity is required' })

		const orderDate = req.body.orderDate

		const order = await OrderModel.create({
			orderDate,
			user,
			product,
			quantity,
		})
		const userCart = await CartModel.findOne({ user: user })
			.populate({
				path: 'orders',
				populate: { path: 'product', select: '-createdAt -updatedAt' },
				select: '-user -createdAt -updatedAt',
			})
			.select('-createdAt -updatedAt')

		if (!userCart) {
			return res
				.status(404)
				.json({ message: `User with Id : ${user} not found` })
		}

		userCart.orders.push(order._id)
		await userCart.save()
		userCart.getCartTotal()
		res.status(201).json({ data: order })
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}
export const getOrderById = async (req, res) => {
	const { id } = req.params
	try {
		const orderFound = await OrderModel.findById(id)
		if (!orderFound) return res.status(404).json({ message: 'Order not found' })
		return res.status(200).json({ data: orderFound })
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}
export const deleteOrder = async (req, res) => {
	try {
		const { id } = req.params
		const orderFound = await OrderModel.findById(id)

		if (!orderFound) {
			return res.status(400).json({
				message: `We could not find the product with ID : ${id}`,
			})
		}
		await OrderModel.deleteOne({ _id: id })
		const userCart = await CartModel.findOne({ user: orderFound.user })

		userCart.orders = userCart.orders.filter(
			(orderId) => orderId.toString() !== id
		)

		await userCart.save()

		userCart.getCartTotal()
		return res
			.status(200)
			.json({ message: `The product with ID : ${id} was successfully deleted` })
	} catch (error) {
		res.status(400).json({
			message: `We could not find the product with ID: ${req.params.id}`,
		})
	}
}
