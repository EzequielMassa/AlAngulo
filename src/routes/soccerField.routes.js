import { Router } from 'express'
import {
	createSoccerField,
	deleteSoccerField,
	getAllSoccerFields,
	getAllSoccerFieldsByQuery,
	getSoccerFieldById,
	updateSoccerField,
} from '../controllers/soccerField.controllers.js'
import { verifyToken,isAdmin } from '../middlewares/authJwt.js'
const router = Router()

router.get('/soccerfields', getAllSoccerFields)
router.get('/soccerfield/:id', getSoccerFieldById)
router.get('/soccerfields/query', getAllSoccerFieldsByQuery)
router.post('/soccerfield',[verifyToken,isAdmin], createSoccerField)
router.put('/soccerfield/update/:id', [verifyToken,isAdmin] ,updateSoccerField)
router.delete('/soccerfield/delete/:id', [verifyToken,isAdmin] ,deleteSoccerField)

export default router
