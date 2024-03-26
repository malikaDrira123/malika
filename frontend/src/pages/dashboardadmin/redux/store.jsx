// Ce code configure le store Redux à l'aide de Redux Toolkit (@reduxjs/toolkit) et combine les reducers de chaque fonctionnalité de l'application.
import { configureStore } from "@reduxjs/toolkit";

import articleSlice from "./features/articleSlice";

//  Importe le reducer de la fonctionnalité des sous-catégories depuis le fichier ScategorieSlice.js situé dans le dossier features.
import ScategorieSlice from "./features/ScategorieSlice";
import userSlice  from "./features/UserSlice";
import categorieSlice from "./features/categorieSlice";

// Exporte le store Redux configuré en utilisant configureStore de Redux Toolkit.
//  La méthode configureStore prend un objet avec une propriété reducer, qui est un objet contenant tous les reducers de l'application.
//  Chaque clé de cet objet correspond à un slice de reducer et sa valeur correspond au reducer associé importé précédemment.
export const Store = configureStore({
    reducer: {
        articles : articleSlice,
        categories: categorieSlice,
        scategories:ScategorieSlice,
        users:userSlice
    },
  });