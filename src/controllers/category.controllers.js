import { CategoryModel } from '../models/Category.model.js'

export const getAllCategories = async (req, res) => {
	try {
		const categories = await CategoryModel.find()
		if (categories.length === 0) {
			return res.status(404).json({ message: 'No se encontro la categoria.' })
		}
		return res.status(200).json({ data: categories })
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}

export const createCategory = async (req, res) => {
	try {
		const { name, description, image } = req.body
		const newCategory = await CategoryModel.create({ name, description, image })
		return res.status(201).json({ data: newCategory })
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}

export const deleteCategory = async (req, res) => {
	try {
		const { id } = req.params
		const categoryFound = await CategoryModel.findById(id)
		if (!categoryFound) {
			return res.status(404).json({ message: 'Categoria no encontrada.' })
		}
		await CategoryModel.deleteOne({ _id: id })
		return res.status(200).json({
			message: `Categoria : ${categoryFound.name} se elimino correctamente`,
		})
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

export const updateCategory = async (req, res) => {
	try {
		const { id } = req.params
		const { description } = req.body
		const categoryFound = await CategoryModel.findById(id)
		const categoryOld = categoryFound.name
		if (!categoryFound) {
			return res.status(404).json({ message: 'Categoria no encontrada' })
		}
		if (!description)
			return res.status(400).json({ message: 'La descripcion es requerida' })
		categoryFound.set({ description: description })
		await categoryFound.save()
		return res
			.status(200)
			.json({
				message: `Categoria : ${categoryOld} se actualizo correctamente.`,
			})
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}
