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
		if (!user) return res.status(404).json({ message: 'Usuario no encontrado' })

		const userRole = await RoleModel.find({ _id: user.role._id })
		if (userRole.name == 'admin') {
			return res
				.status(400)
				.json({ message: 'El administrador no puede crear ordenes.' })
		} else if (userState === false) {
			return res
				.status(400)
				.json({ message: 'Su estado actual es suspendido.' })
		}
		const product = await ProductModel.findById(req.body.product)
		if (!product)
			return res.status(404).json({ message: 'Producto no encontrado' })

		const quantity = req.body.quantity
		if (!quantity)
			return res.status(400).json({ message: 'La cantidad es requerida' })

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
				.json({ message: `Usuario con Id : ${user} no encontrado.` })
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
		if (!orderFound)
			return res.status(404).json({ message: 'Orden no encontrada.' })
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
				message: `No encontramos el producto con Id : ${id}`,
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
			.json({ message: `El producto con Id : ${id} se elimino correctamente.` })
	} catch (error) {
		res.status(400).json({
			message: `No pudimos encontrar el producto con Id : ${req.params.id}`,
		})
	}
}
