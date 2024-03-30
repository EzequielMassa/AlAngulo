import { Error } from 'mongoose'
import { BookingModel } from '../models/Booking.model.js'
import { CartModel } from '../models/Cart.model.js'
import { SoccerFieldModel } from '../models/SoccerField.model.js'
import { UserModel } from '../models/User.model.js'
import { dateRegEx } from '../utils/dateRegEx.js'
import { soccerFieldAvailableHours } from '../utils/soccerFieldAvailableHours.js'

export const getAllBookings = async (req, res) => {
	try {
		const bookings = await BookingModel.find()
			.populate({
				path: 'user',
				select: '-createdAt -updatedAt -password -orders -booking',
			})
			.populate({
				path: 'soccerField',
				select: '-createdAt -updatedAt',
			})
		if (!bookings) {
			return res.status(404).json({ message: 'Bookings not found' })
		}
		return res.status(200).json({ data: bookings })
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}

export const getAllBookingsByDate = async (req, res) => {
	try {
		const { date } = req.params
		if (!date.match(dateRegEx)) {
			return res.status(400).json({
				message: 'Invalid date , please use the formate : YYYY-mm-dd ',
			})
		}
		const bookings = await BookingModel.find({ date: date })
			.populate({
				path: 'user',
				select: '-createdAt -updatedAt -password -orders -booking',
			})
			.populate({
				path: 'soccerField',
				select: '-createdAt -updatedAt',
			})
		if (!bookings) {
			return res.status(404).json({ message: 'Bookings not found' })
		}
		return res.status(200).json({ data: bookings })
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}

export const getBookingById = async (req, res) => {
	try {
		const { id } = req.params
		const booking = await BookingModel.find({ _id: id })
			.populate({
				path: 'user',
				select: '-createdAt -updatedAt -password -orders -booking',
			})
			.populate({
				path: 'soccerField',
				select: '-createdAt -updatedAt',
			})
		if (booking.length === 0) {
			return res.status(404).json({ message: 'Booking not found' })
		}
		return res.status(200).json({ data: booking })
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}

export const createBooking = async (req, res) => {
	try {
		const user = await UserModel.findById(req.body.user)
		const soccerField = await SoccerFieldModel.findById(req.body.soccerField)
		const time = req.body.time
		const date = req.body.date
		const availableHours = await getSoccerFieldAvailableHours(
			req.body.soccerField,
			date
		)

		if (!user) return res.status(404).json({ message: 'User not found' })
		if (!soccerField)
			return res.status(404).json({ message: 'Soccerfield not found' })
		if (!time) return res.status(400).json({ message: 'The time is required' })

		const regExTime = /^([01]\d|2[0-3]):00$/
		if (!regExTime.test(time)) {
			return res
				.status(400)
				.json({ message: 'Incorrect time format, must be HH:00' })
		}

		const bookingAlreadyExist = availableHours.find((hour) => hour === time)
		if (!bookingAlreadyExist) {
			return res.status(400).json({ message: 'Hour already taken' })
		}

		const booking = await BookingModel.create({
			user: user._id,
			soccerField: soccerField._id,
			time,
			date,
		})

		const userCart = await CartModel.findOne({ user: user })
			.populate({
				path: 'bookings',
				populate: { path: 'soccerField', select: '-createdAt -updatedAt' },
				select: '-user -createdAt -updatedAt',
			})
			.select('-createdAt -updatedAt')

		if (!userCart) {
			return res
				.status(404)
				.json({ message: `User with Id : ${user} not found` })
		}

		userCart.bookings.push(booking._id)
		await userCart.save()
		userCart.getCartTotal()

		return res.status(201).json({ data: booking })
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}

export const getAvailableHours = async (req, res) => {
	const { soccerfield, date } = req.query
	if (!soccerfield && !date) {
		return res
			.status(400)
			.json({ message: 'soccerfield and date query not found' })
	}
	try {
		const soccerFieldbookings = await getSoccerFieldAvailableHours(
			soccerfield,
			date
		)
		return res.status(200).json({ data: soccerFieldbookings })
	} catch (error) {
		return res.status(404).json({
			message:
				'We have not been able to find the schedules with the data provided',
		})
	}
}

const getSoccerFieldAvailableHours = async (soccerfieldId, date) => {
	try {
		const soccerFieldDayBooking = await BookingModel.find({
			date: date,
			soccerField: soccerfieldId,
		})
		const notAvailableHours = soccerFieldDayBooking.map(
			(booking) => booking.time
		)

		const result = soccerFieldAvailableHours.filter((hour) => {
			for (let time of notAvailableHours) {
				if (time == hour) {
					return false
				}
			}
			return true
		})

		return result
	} catch (error) {
		throw new Error(error.message)
	}
}

export const deleteBooking = async (req, res) => {
	try {
		const { id } = req.params
		const booking = await BookingModel.findById(id)
		if (!booking) {
			return res.status(404).json({ message: `Booking Id : ${id} not found.` })
		}
		await BookingModel.deleteOne({ _id: id })
		const userCart = await CartModel.findOne({ user: booking.user })
		userCart.bookings = userCart.bookings.filter(
			(bookingId) => bookingId.toString() !== id
		)
		await userCart.save()
		userCart.getCartTotal()
		return res
			.status(200)
			.json({ message: `Booking with Id : ${id} successfully deleted.` })
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}
