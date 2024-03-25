import { Schema, model } from 'mongoose'
const orderSchema = new Schema(
	{
		orderDate: {
			type: Date,
			required: true,
		},
		product: {
			type: Schema.Types.ObjectId,
			ref: 'Products',
			required: true,
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: 'Users',
			required: true,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
)

export const OrderModel = model('Order', orderSchema)
