import React from "react";
// Utilise la méthode createContext() de React pour créer un contexte React nommé StoreContext.
//  Un contexte est utilisé pour partager des données entre les composants React sans passer explicitement 
//  les props à travers chaque niveau de l'arborescence des composants.
const StoreContext = React.createContext();

// Le contexte StoreContext créé de cette manière peut être utilisé pour fournir le store Redux
  //  à l'ensemble de l'application React, ce qui permet à tous les composants d'accéder à 
  //  l'état global géré par Redux.
  
export {
  
  StoreContext
}