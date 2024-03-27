import { Schema, model } from 'mongoose'
const orderSchema = new Schema(
	{
		orderDate: {
			type: Date,
			required: true,
		},
		product: {
			type: Schema.Types.ObjectId,
			ref: 'Product',
			required: true,
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
)

export const OrderModel = model('Order', orderSchema)
