import { Error } from 'mongoose'
import { BookingModel } from '../models/Booking.model.js'
import { CartModel } from '../models/Cart.model.js'
import RoleModel from '../models/Role.model.js'
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
			return res.status(404).json({ message: 'Reserva no encontrada' })
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
				message: 'Fecha invalida , por favor use el formato : AAAA-mm-dd ',
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
			return res.status(404).json({ message: 'Reserva no encontrada' })
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
			return res.status(404).json({ message: 'Reserva no encontrada' })
		}
		return res.status(200).json({ data: booking })
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}

export const createBooking = async (req, res) => {
	try {
		const user = await UserModel.findById(req.body.user)
		const userState = user.active
		const userRole = await RoleModel.find({ _id: user.role._id })

		if (userRole.name == 'admin') {
			return res
				.status(400)
				.json({ message: 'El admin no puede crear reservas' })
		} else if (userState === false) {
			return res.status(400).json({ message: 'Su estado actual es suspendido' })
		}
		const soccerField = await SoccerFieldModel.findById(req.body.soccerField)
		const time = req.body.time
		const date = req.body.date
		const availableHours = await getSoccerFieldAvailableHours(
			req.body.soccerField,
			date
		)

		if (!user) return res.status(404).json({ message: 'Usuario no encontrado' })
		if (!soccerField)
			return res.status(404).json({ message: 'Cancha no encontrada' })
		if (!time)
			return res.status(400).json({ message: 'El Horario es requerida' })

		const regExTime = /^([01]\d|2[0-3]):00$/
		if (!regExTime.test(time)) {
			return res
				.status(400)
				.json({ message: 'Horario incorrecto, debe ser HH:00' })
		}

		const bookingAlreadyExist = availableHours.find((hour) => hour === time)
		if (!bookingAlreadyExist) {
			return res.status(400).json({ message: 'Horario ya tomado' })
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
				.json({ message: `Usuario con Id : ${user} no encontrado` })
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
			.json({ message: 'Query de cancha y horario no encontrada' })
	}
	if (!dateRegEx.test(date)) {
		return res
			.status(400)
			.json({ message: 'Incorrecto formato de fecha , debe ser AAAA-mm-dd' })
	}

	const queryToDate = new Date(date)
	const today = new Date()
	today.setUTCHours(0)
	today.setUTCMinutes(0)
	today.setUTCSeconds(0)
	today.setUTCMilliseconds(0)
	today.setDate(today.getDate() - 1)
	if (queryToDate < today) {
		return res
			.status(400)
			.json({ message: 'La fecha no puede ser anterior a la fecha actual.' })
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
				'No hemos podido encontrar los horarios con los datos facilitados',
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
			return res
				.status(404)
				.json({ message: `Reserva con Id : ${id} no encontrada.` })
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
			.json({ message: `Reserva con Id : ${id} borrada correctamente.` })
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}
