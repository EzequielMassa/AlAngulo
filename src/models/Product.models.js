import { Schema, model } from 'mongoose'
const productSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			minLength: [3, 'El nombre debe contener al menos 3 caracteres.'],
			maxLength: [100, 'El nombre debe tener un maximo de 100 caracteres.'],
		},
		description: {
			type: String,
			required: true,
			minLength: [3, 'La descripcion debe contener al menos 3 caracteres.'],
			maxLength: [
				800,
				'La descripcion debe tener un maximo de 800 caracteres.',
			],
		},
		category: {
			type: Schema.Types.ObjectId,
			ref: 'Category',
			required: [true, 'La categoria es requerida'],
		},
		price: {
			type: Number,
			required: true,
			min: [1, 'El precio minimo es 1 , y usted ingreso : ${VALUE} .'],
			default: 1,
		},
		image: {
			type: String,
			match: [
				/^.*\.(jpg|jpeg|png|gif|bmp)$/i,
				'Por favor ingrese una url de imagen valida (jpg,png,gif,bmp)',
			],
			default: 'https://i.imgur.com/I03y2Ec.png',
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
)

export const ProductModel = model('Product', productSchema)
