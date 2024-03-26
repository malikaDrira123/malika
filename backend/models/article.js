import mongoose from "mongoose";
import Categorie from "./categorie.js";
import Scategorie from "./scategorie.js";

const articleSchema = new mongoose.Schema(
  {
    reference: { type: String, required: true, unique: true },
    designation: { type: String, required: true, unique: true },

     prixAchat: { type: Number, currency: String, required: false },

    prixVente: { type: Number, currency: String, required: false },

    prixSolde: { type: Number, currency: String, required: false },

    marque: { type: String, required: true },
    qtestock: { type: Number, required: false },
    caracteristiques: { type: String, required: false },

    image: {
      petitformat: { type: String, required: false },
      grandformat: { type: Array, required: false },
    },

    imageartgrandf: { type: Array, required: false },
imageartpetitf:{ type: String, required: false },

    categorieID: { type: mongoose.Schema.Types.ObjectId, ref: Categorie },

    scategorieID: { type: mongoose.Schema.Types.ObjectId, ref: Scategorie },
  },
  {
    timestamps: true,
  }
);

const Article = mongoose.model("Article", articleSchema);

export default Article;
