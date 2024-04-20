import { SoccerFieldModel } from '../models/SoccerField.model.js'

export const getAllSoccerFields = async (req, res) => {
	try {
		const soccerFields = await SoccerFieldModel.find()
		return res.status(200).json({ data: soccerFields })
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}

export const getSoccerFieldById = async (req, res) => {
	const { id } = req.params
	try {
		const soccerField = await SoccerFieldModel.findById(id)
		if (!soccerField) {
			return res.status(404).json({ message: 'Cancha no encontrada.' })
		}
		return res.status(200).json({ data: soccerField })
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}

export const getAllSoccerFieldsByQuery = async (req, res) => {
	const { grass, size } = req.query
	if (grass && grass !== 'sintetic' && grass !== 'natural')
		return res.status(400).json({
			message: `${grass} no es un pasto valido, las opciones validas son : sintetic | natural`,
		})
	if (size && size !== '5' && size !== '11')
		return res.status(400).json({
			message: `${size} no es un tamaño de cancha valido, las opciones validas son : 5 | 11`,
		})
	let soccerFields
	try {
		if (grass && size) {
			soccerFields = await SoccerFieldModel.find({ grass: grass, size: size })
		} else if (grass) {
			soccerFields = await SoccerFieldModel.find({ grass: grass })
		} else if (size) {
			soccerFields = await SoccerFieldModel.find({ size: size })
		}
		return res.status(200).json({ data: soccerFields })
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}

export const createSoccerField = async (req, res) => {
	try {
		const newSoccerField = await SoccerFieldModel.create({ ...req.body })
		return res.status(201).json({ data: newSoccerField })
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}

export const updateSoccerField = async (req, res) => {
	const { id } = req.params
	try {
		const soccerField = await SoccerFieldModel.findById(id)
		if (!soccerField) {
			return res.status(404).json({ message: 'Cancha no encontrada.' })
		}
		soccerField.set(req.body)
		await soccerField.save()
		return res.status(200).json({ data: soccerField })
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}

export const deleteSoccerField = async (req, res) => {
	const { id } = req.params
	try {
		const soccerField = await SoccerFieldModel.findById(id)
		if (!soccerField) {
			return res
				.status(404)
				.json({ message: `Cancha con Id : ${id} no encontrada.` })
		}
		await SoccerFieldModel.deleteOne({ _id: id })
		return res
			.status(200)
			.json({ message: `Cancha con Id : ${id} eliminada correctamente.` })
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}
