import React from "react";
import "./breadcrum.css";
import arrow_icon from "../assets/breadcrum_arrow.png";

// Définition du composant Breadcrumb en tant que fonction fléchée prenant les props comme argument
const Breadcrumb = (props) => {
  // Extraction de la propriété "product" des props
  const { product } = props;
  
   // Rendu du composant Breadcrumb
  return (
    <article className="breadcrumb">
    {/* Affichage du lien "HOME" */}
    
      HOME <img src={arrow_icon} alt="" />
       {/* Affichage du lien "SHOP" */}
      SHOP
      <img src={arrow_icon} alt="" /> {product.category}{" "}
      <img src={arrow_icon} alt="" />
       {/* Affichage de la catégorie du produit provenant des props */}
      {product.name}
    </article>
  );
};
// Export du composant Breadcrumb pour pouvoir l'utiliser dans d'autres fichiers
export default Breadcrumb;
