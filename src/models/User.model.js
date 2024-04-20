import { Schema, model } from 'mongoose'

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'El nombre es requerido.'],
			minLength: [3, 'El nombre debe tener un minimo de 3 caracteres.'],
			maxLength: [150, 'El nombre debe tener un maximo de 150 caracteres.'],
		},
		lastname: {
			type: String,
			required: [true, 'El apellido es requerido.'],
			minLength: [3, 'El apellido debe tener un minimo de 3 caracteres.'],
			maxLength: [150, 'El apellido debe tener un maximo de 150 caracteres.'],
		},
		email: {
			type: String,
			unique: [true, 'El email debe ser unico.'],
			required: [true, 'El email es requerido.'],
			minLength: [6, 'El email debe tener un minimo de 6 caracteres.'],
			maxLength: [150, 'El email no puede superar los 150 caracteres.'],
			match: [
				/^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/,
				'Inserte un formato valido de email.',
			],
		},
		phone: {
			type: String,
			required: [true, 'El telefono es requerido.'],
			unique: [true, 'El telefono debe ser unico.'],
			minLength: [10, 'El telefono debe tener un minimo de 10 caracteres.'],
			maxLength: [15, 'El telefono debe tener un maximo de 15 caracteres.'],
			match: [/^\+?\d{0,3}\s?\d{9}$/, 'Inserte un formato de telefono valido.'],
		},
		password: {
			type: String,
			required: [true, 'La contraseña es requerida.'],
			minLength: [8, 'La contraseña debe tener al menos 8 caracteres.'],
			maxLength: [100, 'La contraseña debe tener 100 caracteres como maximo.'],
			match: [
				/^(?!.*\s).{8,100}$/,
				'Inserte un formato valido ejemplo : user1234',
			],
		},
		image: {
			type: String,
			match: [
				/^.*\.(jpg|jpeg|png|gif|bmp)$/i,
				'Por favor ingrese una url de imagen valida (jpg,png,gif,bmp)',
			],
			default:
				'https://cdn3.iconfinder.com/data/icons/glypho-generic-icons/64/user-man-512.png',
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
