import { SoccerFieldModel } from '../models/SoccerField.model.js'
import { ProductModel } from '../models/Product.models.js'

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
export const createProducts = async () => {
	try {
		const count = await ProductModel.estimatedDocumentCount()

		if (count > 0) return

		const values = await Promise.all([
			new ProductModel({
				name: 'Casaca AlAngulo',
				description: 'Camiseta del club con logo de Alngulo',
				categorie: 'Camiseta',
				price: 7500,
				quantity: 1,
				image: 'imagen.jpg'
			}).save(),
			new ProductModel({
				name: 'Casaca AlAngulo Alternativa',
				description: 'Camiseta del club con logo de Alngulo',
				categorie: 'Camiseta',
				price: 8500,
				quantity: 1,
				image: 'imagen2.jpg'
			}).save(),
			new ProductModel({
				name: 'Pelota AlAngulo',
				description: 'Pelota del club con logo de Alngulo',
				categorie: 'Pelotas',
				price: 35500,
				quantity: 1,
				image: 'imagen3.jpg'
			}).save(),
		])
	} catch (error) {
		console.error(error)
	}
}
