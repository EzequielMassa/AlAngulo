import { Schema, model } from 'mongoose'

const bookingSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'Users',
			// required: [true, 'The User is required'],
		},
		soccerField: {
			type: Schema.Types.ObjectId,
			ref: 'SoccerFields',
			// required: [true, 'The SoccerField is required'],
		},
		time: {
			type: String,
		},
		date: {
			type: String,
			match: [
				/^\d{4}-\d{2}-\d{2}$/,
				'Incorrect date format , must be YYYY-mm-dd',
			],
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
