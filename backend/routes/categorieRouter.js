import express from "express";
import { getCategories, createCategorie, getCategoriesByID, updateCategorie, deleteCategorie } from "../controllers/categoriesControlles.js";

const router = express.Router(); 

router.get('/', getCategories); 
router.post('/', createCategorie) ;
router.get('/:id',getCategoriesByID) ;
router.put('/:id',updateCategorie);
router.delete('/:id', deleteCategorie);

export default router