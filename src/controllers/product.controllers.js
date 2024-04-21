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
		return res.status(500).json({ message: error.message })
	}
}

export const createProduct = async (req, res) => {
	try {
		const productCategory = await CategoryModel.findOne({
			name: req.body.category,
		})

		if (!productCategory)
			return res.status(404).json({ message: 'Categoria no encontrada.' })

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
			return res.status(404).json({ message: 'Producto no encontrado.' })
		return res.status(200).json({ data: productFound })
	} catch (error) {
		return res
			.status(404)
			.json({ message: 'No pudimos encontrar el producto solicitado.' })
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
	if (!sortOrder)
		return res
			.status(404)
			.json({ message: 'No se encontro el parametro query.' })
	try {
		const sortedProductsByPrice = await ProductModel.find().sort({
			price: sortOrder,
		})
		return res.status(200).json({ data: sortedProductsByPrice })
	} catch (error) {
		return res
			.status(400)
			.json({ message: `${sortOrder} no es un parametro query valido.` })
	}
}

export const deleteProduct = async (req, res) => {
	try {
		const { id } = req.params
		const productFound = await ProductModel.findById(id)
		if (!productFound) {
			return res.status(404).json({
				message: `No pudimos encontrar el producto con Id : ${id}`,
			})
		}
		await ProductModel.deleteOne({ _id: id })
		return res
			.status(200)
			.json({ message: `El producto con Id : ${id} se elimino correctamente.` })
	} catch (error) {
		res.status(400).json({
			message: `No pudimos encontrar el producton con Id : ${req.params.id}`,
		})
	}
}

export const updateProduct = async (req, res) => {
	const { id } = req.params
	try {
		const product = await ProductModel.findById(id)
		if (!product) {
			return res.status(404).json({ message: 'Producto no encontrado.' })
		}
		const category = await CategoryModel.findOne({ name: req.body.category })
		product.set({ ...req.body, category: category._id })
		await product.save()
		res.status(200).json(product)
	} catch (error) {
		if (error.name === 'CastError') {
			return res.status(404).json({
				message: `No pudimos encontrar el producto con Id: ${id}`,
			})
		}
		res.status(500).json({ message: error.message })
	}
}
