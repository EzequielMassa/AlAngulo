import { Schema, model } from 'mongoose'

const cartSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: [true, 'The User is required and must be a valid user'],
		},
		orders: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Order',
			},
		],
		bookings: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Booking',
			},
		],
		total: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
)

cartSchema.methods.getCartTotal = function () {
	const bookingsSubtotal = this.bookings.map(
		(booking) => booking.soccerField.price
	)
	const bookingsTotal = bookingsSubtotal.reduce((a, b) => a + b, 0)
	this.total = bookingsTotal
}

export const CartModel = model('Cart', cartSchema)
