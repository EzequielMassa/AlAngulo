import { Schema, model } from 'mongoose'

const cartSchema = new Schema({
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
	},
})

export const CartModel = model('Cart', cartSchema)
