import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import BookingRoutes from './routes/booking.routes.js'

const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.use('/api', BookingRoutes)

export default app
