import { Schema, model } from 'mongoose'

const soccerFieldSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'El nombre es requerido.'],
			minLength: [3, 'El nombre debe contener al menos 3 caracteres.'],
			maxLength: [50, 'El nombre debe tener 50 caracteres como maximo.'],
			unique: [true, 'El nombre de la cancha debe ser unico.'],
		},
		description: {
			type: String,
			required: [true, 'La descripcion es requerida.'],
			minLength: [10, 'La descripcion debe contener al menos 10 caracteres.'],
			maxLength: [50, 'La descripcion debe tener 50 caracteres como maximo.'],
		},
		price: {
			type: Number,
			required: [true, 'El precio es requerido.'],
		},
		grass: {
			type: String,
			enum: {
				values: ['natural', 'sintetico'],
				message: '{VALUE} no es un pasto valido.',
			},
			default: 'sintetic',
			lowercase: true,
			required: [true, 'El pasto es requerido.'],
		},
		imgUrl: {
			type: String,
			match: [
				/^.*\.(jpg|jpeg|png|gif|bmp)$/i,
				'Por favor ingrese una url de imagen valida (jpg,png,gif,bmp)',
			],
			default:
				'https://images.pexels.com/photos/399187/pexels-photo-399187.jpeg',
		},
		size: {
			type: Number,
			enum: {
				values: [5, 11],
				message: '{VALUE} no es un tamaño de cancha valido.',
			},
			required: [true, 'El tamaño de la cancha es requerido.'],
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
)

export const SoccerFieldModel = model('SoccerField', soccerFieldSchema)
