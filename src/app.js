import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import SoccerFieldRoutes from './routes/soccerField.routes.js'

const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use('/api', SoccerFieldRoutes)

export default app
