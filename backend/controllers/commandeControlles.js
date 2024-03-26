import mongoose from 'mongoose';
import Commandes from '../models/commandes.js';

export const getCommande = async (req, res) => { 
try {
const com = await Commandes.find().populate("UsersID").exec();
res.status(200).json(com);
} catch (error) {
res.status(404).json({ message: error.message });
}
}

export const createCommande = async (req, res) => {
const { refcommande, dateAchat, mt_total, paye, UsersID} = req.body;
const newCommande = new Commandes({ 
    refcommande:refcommande, dateAchat:dateAchat,mt_total:mt_total,paye:paye,UsersID:UsersID})
try {
    await newCommande.save();
    res.status(201).json(newCommande );
} catch (error) {
    res.status(409).json({ message: error.message });
}
}

export const updateCommande= async (req, res) => {
const  id  = req.params.id;
const { refcommande, dateAchat, mt_total, paye, UsersID} = req.body;
if (!mongoose.Types.ObjectId.isValid(id)) 
return res.status(404).send(`pas de commande avec un id: ${id}`);
const comm1 = { refcommande:refcommande, dateAchat:dateAchat,mt_total:mt_total,paye:paye,UsersID:UsersID};
await Commandes.findByIdAndUpdate(id, comm1);
res.json(comm1);
}

export const deleteCommande = async (req, res) => {
const { id } = req.params;
if (!mongoose.Types.ObjectId.isValid(id)) return
res.status(404).send(`pas de commande avec l'ID: ${id}`);
await Commandes.findByIdAndDelete(id);
res.json({ message: "Commande deleted successfully." });
}