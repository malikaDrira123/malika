import React, { useContext } from 'react';
import { shopContext } from '../context/ShopContext';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../components/bredcrums/Breadcrumb';
import ProductDisplay from '../components/productDisplay/ProductDisplay';
import RelatedProduct from '../components/relatedProducts/RelatedProduct';


const Product = () => {
   // Utilisation du hook useContext pour accéder au contexte shopContext
  const { all_product } = useContext(shopContext);
  
  // Utilisation du hook useParams pour récupérer les paramètres de l'URL
  const { productId } = useParams();
  // Recherche du produit correspondant à l'ID dans la liste des produits
  const product = all_product.find((e) => e._id === productId);
  
 // Si aucun produit correspondant n'est trouvé, afficher un message "Product not found"
  if (!product) {

    return <>Product not found</>;
  }

  return (
    <>
      <Breadcrumb product={product} />
      <ProductDisplay product={product} />
      
      <RelatedProduct />
    </>
  );
};

export default Product;
