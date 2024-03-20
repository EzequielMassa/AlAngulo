import app from './app.js'

import { PORT } from './config/config.js'
import './database/database.js'

async function main() {
	await app.listen(PORT, async () => {
		console.log(`La aplicación esta escuchando en el puerto ${PORT}`)
	})
}

main()
