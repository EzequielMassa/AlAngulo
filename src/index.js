import app from './app.js'

import { PORT } from './config/config.js'
import { createSoccerFields, createProducts } from './config/initialSetup.js'
import './database/database.js'

async function main() {
	await app.listen(PORT, async () => {
		console.log(`La aplicación esta escuchando en el puerto ${PORT}`)
		createSoccerFields()
		createProducts()
	})
}

main()
