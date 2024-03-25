import { Schema, model } from 'mongoose'
const productSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			minLength: [3,'the field name must have at least 3 characters'],
			maxLength: [100,'the field name must have a maximun of 100 characters']
		},
        description:{
            type: String,
            required: true,
            minLength: [3,'the description field must have at least 3 characters'],
            maxLength: [500,'the description field must have a maximun of 500 characters'],
        },
		categories: {
			type: Schema.Types.ObjectId,
			ref: 'Categories',
			// required: true,
		},
		price: {
			type: Number,
			required: true,
			min: [1, 'El precio minimo es de $1, se ingreso ${VALUE}'],
            default: 1,
		},
        quantity:{
            type: Number,
            min: [1,'must have at least 1 product quantity'],
            required: true,
        },
		image: {
			type: String,
			match: [
				/^.*\.(jpg|jpeg|png|gif|bmp)$/i,
				'Ingrese una ruta de imagen valida',
			],
            default:'agregar logo'
		},
	},
	{
		timestamps: true,
        versionKey: false,
	}
)

export const ProductModel = model('Product', productSchema)