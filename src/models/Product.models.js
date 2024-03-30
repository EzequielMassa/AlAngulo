import { Schema, model } from 'mongoose'
const productSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			minLength: [3, 'the field name must have at least 3 characters'],
			maxLength: [100, 'the field name must have a maximun of 100 characters'],
		},
		description: {
			type: String,
			required: true,
			minLength: [3, 'the description field must have at least 3 characters'],
			maxLength: [
				500,
				'the description field must have a maximun of 500 characters',
			],
		},
		category: {
			type: Schema.Types.ObjectId,
			ref: 'Category',
			required: true,
		},
		price: {
			type: Number,
			required: true,
			min: [1, 'The min price is 1 , and you enter ${VALUE}'],
			default: 1,
		},
		image: {
			type: String,
			match: [
				/^.*\.(jpg|jpeg|png|gif|bmp)$/i,
				'Please provide a valid image path',
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
