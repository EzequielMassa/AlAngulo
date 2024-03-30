import { CategoryModel } from '../models/Category.model.js'
import { ProductModel } from '../models/Product.models.js'
import { SoccerFieldModel } from '../models/SoccerField.model.js'

export const createSoccerFields = async () => {
	try {
		const count = await SoccerFieldModel.estimatedDocumentCount()

		if (count > 0) return

		await Promise.all([
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

		const tshirtCategory = await CategoryModel.findOne({ name: 'Remeras' })
		const soccerBallCategory = await CategoryModel.findOne({ name: 'Pelotas' })

		await Promise.all([
			new ProductModel({
				name: 'Casaca AlAngulo',
				description: 'Camiseta del club con logo de Alngulo',
				category: tshirtCategory._id,
				price: 7500,
			}).save(),
			new ProductModel({
				name: 'Casaca AlAngulo Alternativa',
				description: 'Camiseta del club con logo de Alngulo',
				category: tshirtCategory._id,
				price: 8500,
			}).save(),
			new ProductModel({
				name: 'Pelota AlAngulo',
				description: 'Pelota del club con logo de Alngulo',
				category: soccerBallCategory._id,
				price: 35500,
			}).save(),
		])
	} catch (error) {
		console.error(error)
	}
}

export const createDefaultCategories = async () => {
	try {
		const count = await CategoryModel.estimatedDocumentCount()

		if (count > 0) return

		await Promise.all([
			new CategoryModel({
				name: 'Remeras',
				description: 'Las mejores remeras futboleras de AlAngulo',
			}).save(),
			new CategoryModel({
				name: 'Pelotas',
				description: 'Las mejores pelotas futboleras de AlAngulo',
			}).save(),
			new CategoryModel({
				name: 'Tazas',
				description: 'Las mejores tazas futboleras de AlAngulo',
			}).save(),
			new CategoryModel({
				name: 'Bebidas',
				description: 'Las mejores bebidas de AlAngulo',
			}).save(),
		])
	} catch (error) {
		console.error(error)
	}
}
