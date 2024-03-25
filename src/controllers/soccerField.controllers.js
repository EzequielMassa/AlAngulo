import { SoccerFieldModel } from '../models/SoccerField.model.js'

export const getAllSoccerFields = async (req, res) => {
	try {
		const soccerFields = await SoccerFieldModel.find()
		return res.status(200).json({ data: soccerFields })
	} catch (error) {
		return res.status(404).json({ message: error.message })
	}
}

export const getSoccerFieldById = async (req, res) => {
	const { id } = req.params
	try {
		const soccerField = await SoccerFieldModel.findById(id)
		return res.status(200).json({ data: soccerField })
	} catch (error) {
		return res.status(404).json({ message: 'Soccer field not found' })
	}
}

export const getAllSoccerFieldsByQuery = async (req, res) => {
	const { grass, size } = req.query
	if (grass && grass !== 'sintetic' && grass !== 'natural')
		return res.status(400).json({
			message: `${grass} is not a valid grass, available options are : sintetic | natural`,
		})
	if (size && size !== '5' && size !== '11')
		return res.status(400).json({
			message: `${size} is not a valid size, available options are : 5 | 11`,
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
		// const soccerField = await SoccerFieldModel.find({ grass: grass })
		return res.status(200).json({ data: soccerFields })
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}

export const createSoccerField = async (req, res) => {
	try {
		const newSoccerField = await SoccerFieldModel.create({ ...req.body })
		return res.status(201).json(newSoccerField)
	} catch (error) {
		return res.status(400).json({ message: error.message })
	}
}

export const updateSoccerField = async (req, res) => {
	const { id } = req.params
	try {
		const soccerField = await SoccerFieldModel.findById(id)
		if (!soccerField)
			return res.status(404).json({ message: 'Soccerfield not found' })
		soccerField.set(req.body)
		await soccerField.save()
		res.status(200).json(soccerField)
	} catch (error) {
		return res.status(400).json({ message: error.message })
	}
}

export const deleteSoccerField = async (req, res) => {
	const { id } = req.params
	try {
		const soccerField = await SoccerFieldModel.findById(id)
		if (!soccerField) {
			return res
				.status(404)
				.json({ message: `Soccerfield with Id : ${id} not found` })
		}
		await SoccerFieldModel.deleteOne({ _id: id })
		return res
			.status(200)
			.json({ message: `Soccerfield with Id : ${id} successfully deleted` })
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}
