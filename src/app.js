import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import router from './routes/user.routes.js'
const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

// aca van las rutas
// ejemplo :
 app.use('/api',router)

export default app
