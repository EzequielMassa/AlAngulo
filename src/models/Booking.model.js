import { Schema, model } from 'mongoose'
import { dateRegEx } from '../utils/dateRegEx.js'

const bookingSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: [true, 'The User is required and must be a valid user'],
		},
		soccerField: {
			type: Schema.Types.ObjectId,
			ref: 'SoccerField',
			required: [
				true,
				'The SoccerField is required and must be a valid soccerfield',
			],
		},
		time: {
			type: String,
		},
		date: {
			type: String,
			match: [dateRegEx, 'Incorrect date format , must be YYYY-mm-dd'],
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
					'The date and the time cannot be before the current date and time ',
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
