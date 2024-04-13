import { Schema, model } from 'mongoose'

const CategorySchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'The name is required'],
			minLength: [3, 'The field name must contain at least 3 characters'],
			maxLength: [100, 'The field name must be 100 characters maximum'],
			unique: true,
		},
		description: {
			type: String,
			minLength: [
				3,
				'The field description must contain at least 3 characters',
			],
			maxLength: [500, 'The field description must be 500 characters maximum'],
		},
		image: {
			type: String,
			match: [
				/^.*\.(jpg|jpeg|png|gif|bmp)$/i,
				'Please provide a valid image path',
			],
			default: 'https://i.imgur.com/isEp9jy.png',
		},
	},
	{
		versionKey: false,
	}
)

export const CategoryModel = model('Category', CategorySchema)
