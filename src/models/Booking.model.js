import { Schema, model } from 'mongoose'
import { dateRegEx } from '../utils/dateRegEx.js'

const bookingSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: [true, 'El usuario es requerido y debe existir.'],
		},
		soccerField: {
			type: Schema.Types.ObjectId,
			ref: 'SoccerField',
			required: [true, 'La cancha es requerida y debe existir.'],
			minLength: [3, 'El nombre debe contener al menos 3 caracteres.'],
			maxLength: [50, 'El nombre debe tener 50 caracteres como maximo.']
		},
		time: {
			type: String,
		},
		date: {
			type: String,
			match: [dateRegEx, 'Formato de fecha incorrecto , debe ser AAAA-mm-dd'],
			validate: {
				validator: function (v) {
					const fullDate = `${v} ${this.time}:00 GMT+0000`
					const completeReceivedDate = new Date(fullDate)
					const today = new Date()
					today.setHours(today.getHours() - 3)
					const isOldDate = completeReceivedDate > today
					return isOldDate
				},
				message:
					'La fecha y horario no pueden ser anteriores a la fecha y horario actual.',
			},
			required: true,
		},
	},

	{
		timestamps: true,
		versionKey: false,
	}
)
export const BookingModel = model('Booking', bookingSchema)
