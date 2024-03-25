import { Schema, model } from 'mongoose'

const soccerFieldSchema = new Schema(
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
			required: [true, 'The description is required'],
			minLength: [
				10,
				'The field description must contain at least 3 characters',
			],
			maxLength: [500, 'The field description must be 500 characters maximum'],
		},
		price: {
			type: Number,
			required: [true, 'The price is required'],
		},
		grass: {
			type: String,
			enum: {
				values: ['natural', 'sintetic'],
				message: '{VALUE} is not a valid soccer field type',
			},
			default: 'sintetic',
			lowercase: true,
			required: [true, 'The soccer field type is required'],
		},
		imgUrl: {
			type: String,
			match: [
				/^.*\.(jpg|jpeg|png|gif|bmp)$/i,
				'The image path format is invalid',
			],
			default:
				'https://images.pexels.com/photos/399187/pexels-photo-399187.jpeg',
		},
		size: {
			type: Number,
			enum: {
				values: [5, 11],
				message: '{VALUE} is not a valid soccer field size',
			},
			required: [true, 'The soccer field size is required'],
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
)

export const SoccerFieldModel = model('SoccerField', soccerFieldSchema)
