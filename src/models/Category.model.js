import { Schema, model } from 'mongoose'

const CategorySchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'El nombre es requerido.'],
			minLength: [3, 'El nombre debe tener al menos 3 caracteres.'],
			maxLength: [100, 'El nombre debe tener un maximo de 100 caracteres.'],
			unique: true,
		},
		description: {
			type: String,
			minLength: [3, 'La descripcion debe contener al menos 3 caracteres.'],
			maxLength: [
				500,
				'La descripcion debe tener un maximo de 500 caracteres.',
			],
		},
		image: {
			type: String,
			match: [
				/^.*\.(jpg|jpeg|png|gif|bmp)$/i,
				'Por favor ingrese una url de imagen valida (jpg,png,gif,bmp)',
			],
			default: 'https://i.imgur.com/isEp9jy.png',
		},
	},
	{
		versionKey: false,
	}
)

export const CategoryModel = model('Category', CategorySchema)
