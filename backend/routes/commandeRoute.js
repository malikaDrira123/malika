import express from "express";
import { getCommande, createCommande, updateCommande, deleteCommande } from "../controllers/commandeControlles.js";

const router = express.Router();

router.get("/", getCommande);
router.post('/', createCommande);
router.put('/:id', updateCommande);
router.delete('/:id', deleteCommande);

export default router ; 