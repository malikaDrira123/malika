import mongoose from "mongoose";
import Article from "../models/article.js";

// Récupérer tous les articles avec les références aux catégories et sous-catégories
export const 
getArticles = async (req, res) => {
    try {
        const articles = await Article.find()
            .populate("categorieID")
            .populate("scategorieID")
            .exec();
        res.status(200).json(articles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Impossible de récupérer les articles" });
    }
};

// Récupérer un article par son ID avec les références aux catégories et sous-catégories
export const getArticleByID = async (req, res) => {
    try {
        const { id } = req.params;
        const art = await Article.findById(id)
            .populate("categorieID")
            .populate("scategorieID")
            .exec();
        if (!art) {
            return res.status(404).json({ message: "Article non trouvé" });
        }
        res.status(200).json(art);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Impossible de récupérer l'article" });
    }
};

// Récupérer les articles par catégorie
export const getArticlesByCategory = async (req, res) => {
    try {

        const { categoryId } = req.params;

        // Validate categoryId before creating an ObjectId
       
        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
             //res.status(400).json({ message: "Invalid categoryId format" });
             return []
        }

      // const validObjectId = mongoose.Types.ObjectId(categoryId);
        
        const articles = await Article.find({ categorieID: categoryId })
            .populate("categorieID")
            .populate("scategorieID")
            .exec();

        if (!articles || articles.length === 0) {
            return res.status(404).json({ message: "Aucun article trouvé pour cette catégorie" });
        }

        res.status(200).json(articles);
    } catch (error) {
        
        res.status(500).json({ message: "Impossible de récupérer les articles par catégorie", error: error });
    }
};

// Créer un nouvel article
export const createArticle = async (req, res) => {
    try {
        // Vérifier si les champs requis sont vides
        const { reference, designation, prixVente, marque, qtestock, caracteristiques, image , categorieID, scategorieID} = req.body;
        if (
            reference.trim() === "" ||
            designation.trim() === "" ||
           // prix.prixAchat.trim() === "" ||
            prixVente.trim() === "" ||
          //  prix.prixSolde.trim() === "" ||
            marque.trim() === "" ||
            qtestock.trim() === "" 
       //  ||   caracteristiques.trim() === ""
        ) {
            return res.status(400).json({ message: "Veuillez remplir tous les champs" });
        }

        // Créer un nouvel article avec ou sans image
        let newArticle;
       
        if (!req.file) {
            newArticle = new Article({
                reference: reference.trim(),
                designation: designation.trim(),
                 //   prixAchat: prixAchat.trim(),
                    prixVente: prixVente.trim(),
              //      prixSolde: prixSolde.trim(),
                
                marque: marque.trim(),
                qtestock: qtestock.trim(),
                caracteristiques: caracteristiques.trim(),
                image: {
                    petitformat: image.petitformat,
                    grandformat: image.grandformat,
                },

                imageartgrandf:image.grandformat,
imageartpetitf: image.petitformat,
                categorieID :categorieID,
                scategorieID:scategorieID,
            });
        } else {
            newArticle = new Article({
                reference: reference.trim(),
                designation: designation.trim(),

                    prixAchat: prix.prixAchat.trim(),
                    prixVente: prix.prixVente.trim(),
                    prixSolde: prix.prixSolde.trim(),
  
                marque: marque.trim(),
                qtestock: qtestock.trim(),
                caracteristiques: caracteristiques.trim(),
            });
        }

        await newArticle.save();
        res.status(201).json({ message: "Article bien créé !" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Impossible de créer l'article" });
    }
};

// Mettre à jour un article
export const updateArticle = async (req, res) => {
    try {
        const { id } = req.params;
        const art = await Article.findByIdAndUpdate(id, req.body, { new: true });
        res.json(art);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Impossible de mettre à jour l'article" });
    }
};

// Supprimer un article
export const deleteArticle = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).send(`Pas d'article avec l'ID : ${id}`);

        const art = await Article.findByIdAndDelete(id);
        res.json({ message: `${art.reference} est supprimé` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Impossible de supprimer l'article" });
    }
};
