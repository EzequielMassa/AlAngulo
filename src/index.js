import app from './app.js'
import { PORT } from './config/config.js'
import {
	createDefaultCategories,
	createProducts,
	createSoccerFields,
} from './config/initialSetup.js'
import './database/database.js'
import { createRoles } from './utils/initialRoles.js'

async function main() {
	await app.listen(PORT, async () => {
		console.log(`The app is listening port : ${PORT}`)
		await createRoles()
		await createDefaultCategories()
		await createProducts()
		await createSoccerFields()
	})
}

main()
