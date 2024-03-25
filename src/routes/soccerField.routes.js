import { Router } from 'express'
import {
	createSoccerField,
	deleteSoccerField,
	getAllSoccerFields,
	getAllSoccerFieldsByQuery,
	getSoccerFieldById,
	updateSoccerField,
} from '../controllers/soccerField.controllers.js'

const router = Router()

router.get('/soccerfields', getAllSoccerFields)
router.get('/soccerfield/:id', getSoccerFieldById)
router.get('/soccerfields/query', getAllSoccerFieldsByQuery)
router.post('/soccerfield', createSoccerField)
router.put('/soccerfield/update/:id', updateSoccerField)
router.delete('/soccerfield/delete/:id', deleteSoccerField)

export default router
