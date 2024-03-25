import { Router } from 'express'

const router = Router()

router.get('/soccerfields', getAllSoccerFields)
router.get('/soccerfield/:id', getSoccerFieldById)
router.get('/soccerfields/type/:type', getAllSoccerFieldsByType)
router.get('/soccerfields/size/:size', getAllSoccerFieldsBySize)
router.post('/soccerfield', createSoccerField)
router.put('/soccerfield/update/:id', updateSoccerField)
router.delete('/soccerfield/delete/:id', deleteSoccerField)

export default router
