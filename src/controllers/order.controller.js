

import { OrderModel } from '../models/order.model.js'



export const getAllOrders = async (req, res) => {
	try {
		const order = await OrderModel.find()
		return res.status(200).json(order)
	} catch (error) {
		return res.status(404).json({ message: error.message })
	}
}

export const createOrder = async (req, res) => {
	try {
		// const user = await UserModel.findById(req.body.user)
		// console.log(user)
		// const product = await ProductModel.findById(req.body.product)
		// console.log(product)
		const orderDate = req.body.orderDate
		
		console.log(orderDate)
		const order = await OrderModel.create({
			orderDate,
			// user,
			// product,
		})
		res.status(200).json(order)
	} catch (error) {
		console.log(error)
		return res.status(400).json({ message: error.message })
	}
}
export const getOrderById = async (req, res) => {
	const { id } = req.params
	try {
		const orderFound = await OrderModel.findById(id)
		return res.status(200).json(orderFound)
	} catch (error) {
		return res
			.status(404)
			.json({ message: 'No hemos podido encontrar el producto solicitado' })
	}
}
export const deleteOrder = async (req, res) => {
	try {
		const { id } = req.params
		const orderFound = await OrderModel.findById(id)
		if (!orderFound) {
			return res
				.status(400)
				.json({ message: `No se encontro el producto con id ${id}` })
		}
		await OrderModel.deleteOne({ _id: id })
		return res
			.status(200)
			.json({ message: `El producto con id ${id} se elimino con exito`})
	} catch (error) {
		res
			.status(400)
			.json({ message: `No se encontro el producto con id ${req.params.id}` })
	}
}



