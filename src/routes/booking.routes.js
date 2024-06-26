import { Router } from 'express'
import {
	createBooking,
	deleteBooking,
	getAllBookings,
	getAllBookingsByDate,
	getAvailableHours,
	getBookingById,
} from '../controllers/booking.controllers.js'

const router = Router()
import { verifyToken,isAdmin } from '../middlewares/authJwt.js'
router.get('/bookings', [verifyToken,isAdmin],getAllBookings)
router.get('/bookings/date/:date',[verifyToken,isAdmin], getAllBookingsByDate)
router.get('/booking/:id', getBookingById)
router.get('/bookings/available_hours', getAvailableHours)
router.post('/booking', createBooking)
router.delete('/booking/delete/:id', deleteBooking)

export default router
