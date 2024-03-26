import express from 'express';
import { getArticles, getArticleByID, createArticle, updateArticle, deleteArticle, getArticlesByCategory } from '../controllers/articlesControlles.js';
import { auth } from '../middelware/auth.middelware.js';
const router = express.Router();

router.get('/', getArticles);
router.post('/', createArticle);
router.get('/:id', getArticleByID);
router.put('/:id', updateArticle);
router.delete('/:id',deleteArticle);
router.get('/category/:categoryId', getArticlesByCategory);


export default router;