import { Error } from 'mongoose'
import { BookingModel } from '../models/Booking.model.js'
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

		if (!time) throw new Error('time is required')
		const regExTime = /^([01]\d|2[0-3]):00$/
		if (!regExTime.test(time))
			throw new Error('Incorrect time format, must be HH:00')

		const bookingAlreadyExist = availableHours.find((hour) => hour === time)

		if (!bookingAlreadyExist) {
			throw new Error('Hour already taken')
		}

		const reserva = await BookingModel.create({
			user: user._id,
			soccerField: soccerField._id,
			time,
			date,
		})
		return res.status(201).json(reserva)
	} catch (error) {
		return res.status(400).json({ message: error.message })
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
				'No hemos podido encontrar los horarios con los datos proporcionados',
		})
	}
}

const getSoccerFieldAvailableHours = async (soccerfieldId, date) => {
	try {
		const soccerFieldDayBooking = await BookingModel.find({
			date: date,
			soccerField: soccerfieldId,
		})
		const horasNoDisponibles = soccerFieldDayBooking.map(
			(booking) => booking.time
		)

		const result = soccerFieldAvailableHours.filter((hour) => {
			for (let time of horasNoDisponibles) {
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
		return res
			.status(200)
			.json({ message: `Booking with Id : ${id} successfully deleted.` })
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}
