import express from 'express';
import { getSCategories, getSCategorieByID, createSCategorie, 
updateSCategorie, deleteSCategorie, getSCategorieByCAT } from '../controllers/scategoriesControlles.js';

const router = express.Router();

router.get('/', getSCategories);
router.post('/', createSCategorie);
router.get('/:id', getSCategorieByID);
router.put('/:id', updateSCategorie);
router.delete('/:id', deleteSCategorie);
router.get('/cat/:categorieID', getSCategorieByCAT);

export default router;