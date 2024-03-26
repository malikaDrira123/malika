import Categorie from "../models/categorie.js";
import mongoose from "mongoose";

export const getCategories = async (req, res) => {
  try {
    const cat = await Categorie.find();
    res.status(200).json(cat);
  } catch (error) {
    res.status(500).json({ message: "Impossible de récupérer les categories" });
  }
};

export const createCategorie = async (req, res) => {
  try {
    const { nomcategorie } = req.body;
    if (nomcategorie.trim() === "") {
      return res.status(401).json({ message: "Veuillez remplir les champs !" });
    }

    let newCategorie;
    if (!req.file) {
      newCategorie = new Categorie({
        nomcategorie: nomcategorie,
        imagecategorie: "",
      });
    } else {
      newCategorie = new Categorie({
        nomcategorie: nomcategorie,
        imagecategorie:"",
      });
    }

    await newCategorie.save();
    res.status(200).json({ message: "Catégorie bien crée!" });
  } catch (error) {
    res.status(500).json({ message: "Impossible de créer une catégorie" });
  }
};

export const getCategoriesByID = async (req, res) => {
  try {
    const cat = await Categorie.findById(req.params.id);
    res.status(201).json(cat);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateCategorie = async (req, res) => {
  const { id } = req.params;
  const { nomcategorie, imagecategorie } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`pas de categorie avec un id: ${id}`);
  const cat1 = {
    nomcategorie: nomcategorie,
    imagecategorie: imagecategorie,
    _id: id,
  };
  await Categorie.findByIdAndUpdate(id, cat1);
  res.json(cat1);
};

export const deleteCategorie = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`pas de categorie avec l'ID: ${id}`);
  await Categorie.findByIdAndDelete(id);
  res.json({ message: "categorie deleted successfully." });
};
