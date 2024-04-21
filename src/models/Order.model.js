import { Schema, model } from 'mongoose'
const orderSchema = new Schema(
	{
		orderDate: {
			type: Date,
			required: [true, 'La fecha es requerida.'],
		},
		product: {
			type: Schema.Types.ObjectId,
			ref: 'Product',
			required: [true, 'El producto es requerido.'],
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: [true, 'El usuario es requerido.'],
		},
		quantity: {
			type: Number,
			default: 1,
			required: [true, 'La cantidad es requerida.'],
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
)

export const OrderModel = model('Order', orderSchema)
