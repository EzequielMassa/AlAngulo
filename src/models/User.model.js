import { Schema, model } from 'mongoose'

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			minLength: 3,
			maxLength: 150,
			match: [/^[a-zA-Z\s]+$/, 'Please insert a valid format name'],
		},
		lastname: {
			type: String,
			required: true,
			minLength: 3,
			maxLength: 150,
			match: [/^[a-zA-Z\s]+$/, 'Please insert a valid format lastname'],
		},
		email: {
			type: String,
			unique: true,
			required: true,
			minLength: 6,
			maxLength: 150,
			match: [
				/^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/,
				'Please insert a valid format email',
			],
		},
		phone: {
			type: String,
			required: true,
			unique: true,
			minLength: 10,
			maxLength: 15,
			match: [/^\+?\d{0,3}\s?\d{9}$/, 'Please insert a valid format phone'],
		},
		password: {
			type: String,
			required: [true, 'The password is required'],
			minLength: 8,
			maxLength: 100,
			match: [/^(?!.*\s).{8,100}$/, 'Please insert a valid password'],
		},
		image: {
			type: String,
			match: [
				/^.*\.(jpg|jpeg|png|gif|bmp)$/i,
				'Please insert a valid image path',
			],
			default: '',
		},

		role: {
			type: Schema.Types.ObjectId,
			ref: 'Role',
		},

		active: {
			type: Boolean,
			default: true,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
)

export const UserModel = model('User', userSchema)
