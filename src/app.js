import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import BookingRoutes from './routes/booking.routes.js'
import SoccerFieldRoutes from './routes/soccerField.routes.js'
import orderRoutes from './routes/order.routes.js'
import ProductRoutes from './routes/order.routes.js'

const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use('./api',orderRoutes)
app.use('/api', BookingRoutes)
app.use('/api', SoccerFieldRoutes)
app.use('/api',ProductRoutes)



export default app
