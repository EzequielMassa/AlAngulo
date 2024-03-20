import cors from 'cors'
import express from 'express'
import morgan from 'morgan'

const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

// aca van las rutas
// ejemplo :
// app.use('/api',ProductRoutes)

export default app
