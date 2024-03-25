import cors from 'cors'
import express from 'express'
import morgan from 'morgan'

import orderRoutes from './routes/order.routes.js'


const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use('./api',orderRoutes)

// aca van las rutas
// ejemplo :
// app.use('/api',ProductRoutes)

export default app
