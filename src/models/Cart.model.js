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

cartSchema.methods.getCartTotal = async function () {
    try {
        const bookings = await this.model('Booking').find({ _id: { $in: this.bookings } }).populate('soccerField');
		const orders = await this.model('Order').find({ _id: { $in: this.orders } }).populate('product');
        let total = 0;
        for (const booking of bookings) {
            if (booking.soccerField) {
                total += booking.soccerField.price;
            }
        }
		for (const order of orders) {
            if (order.product) {
				let subTotal = order.quantity * order.product.price
                total += subTotal;
            }
        }
        this.total = total;
        await this.save();
    } catch (error) {
        throw new Error(error.message);
    }
};


export const CartModel = model('Cart', cartSchema)
