import { SoccerFieldModel } from '../models/SoccerField.model.js'

export const createSoccerFields = async () => {
	try {
		const count = await SoccerFieldModel.estimatedDocumentCount()

		if (count > 0) return

		const values = await Promise.all([
			new SoccerFieldModel({
				name: 'La mundialista',
				description: 'Cancha en honor a los campeones del mundo',
				price: 15000,
				grass: 'natural',
				size: 11,
			}).save(),
			new SoccerFieldModel({
				name: 'El potrerito',
				description: 'Cancha con nostalgia a los viejos potreros',
				price: 10000,
				grass: 'sintetic',
				size: 5,
			}).save(),
			new SoccerFieldModel({
				name: 'La rustica',
				description: 'Cancha rapida ideal para los mas rusticos',
				price: 12000,
				grass: 'sintetic',
				size: 11,
			}).save(),
		])
	} catch (error) {
		console.error(error)
	}
}
