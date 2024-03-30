import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import BookingRoutes from './routes/booking.routes.js'
import CartRoutes from './routes/cart.routes.js'
import orderRoutes from './routes/order.routes.js'
import ProductRoutes from './routes/product.routes.js'
import SoccerFieldRoutes from './routes/soccerField.routes.js'
import router from './routes/user.routes.js'

const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use('/api', CartRoutes)
app.use('/api', orderRoutes)
app.use('/api', BookingRoutes)
app.use('/api', SoccerFieldRoutes)
app.use('/api', ProductRoutes)
app.use('/api', router)


export default app
