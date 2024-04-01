import { CategoryModel } from '../models/Category.model.js'
import { ProductModel } from '../models/Product.models.js'

export const getAllProducts = async (req, res) => {
	try {
		const products = await ProductModel.find().populate({
			path: 'category',
			select: 'name',
		})
		return res.status(200).json({ data: products })
	} catch (error) {
		return res.status(404).json({ message: error.message })
	}
}

export const createProduct = async (req, res) => {
	try {
		const productCategory = await CategoryModel.findOne({
			name: req.body.category,
		})

		if (!productCategory)
			return res.status(404).json({ message: 'Category not found' })
		const newProduct = await ProductModel.create({
			...req.body,
			category: productCategory._id,
		})
		return res.status(201).json({ data: newProduct })
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}

export const getProductById = async (req, res) => {
	const { id } = req.params
	try {
		const productFound = await ProductModel.findById(id)
		if (!productFound)
			return res.status(404).json({ message: 'Product not found' })
		return res.status(200).json({ data: productFound })
	} catch (error) {
		return res
			.status(404)
			.json({ message: 'We could not find the requested product' })
	}
}

export const getProductByCategory = async (req, res) => {
	const { category } = req.params
	try {
		const productsByCategory = await ProductModel.find({
			category: category,
		})
		return res.status(200).json({ data: productsByCategory })
	} catch (error) {
		return res.status(404).json({ message: error.message })
	}
}

export const getProductsSortedByPrice = async (req, res) => {
	const { sortOrder } = req.query
	if (!sortOrder) return res.status(400).json({ message: 'no query found' })
	try {
		const sortedProductsByPrice = await ProductModel.find().sort({
			price: sortOrder,
		})
		return res.status(200).json({ data: sortedProductsByPrice })
	} catch (error) {
		return res
			.status(400)
			.json({ message: `${sortOrder} is not a valid query` })
	}
}

export const deleteProduct = async (req, res) => {
	try {
		const { id } = req.params
		const productFound = await ProductModel.findById(id)
		if (!productFound) {
			return res.status(400).json({
				message: `We could not find the product with ID : ${id}`,
			})
		}
		await ProductModel.deleteOne({ _id: id })
		return res
			.status(200)
			.json({ message: `The product with ID : ${id} was successfully deleted` })
	} catch (error) {
		res.status(400).json({
			message: `We could not find the product with ID : ${req.params.id}`,
		})
	}
}

export const updateProduct = async (req, res) => {
	const { id } = req.params
	try {
		const product = await ProductModel.findById(id)
		if (!product) {
			return res.status(404).json({ message: 'Product not found' })
		}
		product.set(req.body)
		await product.save()
		res.status(200).json(product)
	} catch (error) {
		if (error.name === 'CastError') {
			return res.status(404).json({
				message: `We could not find the product with ID : ${id}`,
			})
		}
		res.status(500).json({ message: error.message })
	}
}
