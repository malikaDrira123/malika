import React, { useContext, useState } from 'react';
import { shopContext } from "../context/ShopContext";
import Items from '../components/items/Items';
import "./CSS/shopCategory.css";

const ShopCategory = (props) => {
  const { all_product } = useContext(shopContext);
  const [sortType, setSortType] = useState('default'); // Utilisation de useState pour gérer l'état du type de tri
  const [visibleProducts, setVisibleProducts] = useState(12); // Nombre initial de produits visibles

  // Fonction pour trier les produits en fonction du type de tri sélectionné
  const sortProducts = (products, type) => {
    switch (type) {
      case 'priceLowToHigh':
        return products.slice().sort((a, b) => a.prixVente - b.prixVente);
      case 'priceHighToLow':
        return products.slice().sort((a, b) => b.prixVente - a.prixVente);
      case 'alphabetical':
        return products.slice().sort((a, b) => a.designation.localeCompare(b.designation));
      // Ajoutez d'autres cas pour d'autres types de tri si nécessaire
      default:
        return products;
    }
  };

  const productsToShow = sortProducts(all_product, sortType).slice(0, visibleProducts);

  const handleSortChange = (event) => {
    setSortType(event.target.value);
  };

  const handleLoadMore = () => {
    // Charger plus de produits, par exemple, augmenter de 12 le nombre de produits visibles
    setVisibleProducts(prev => prev + 12);
  };

  return (
    <section className='shop-category'>
      <img className="shopcategory-banner" src={props.banner} alt="" />
      <section className="shopcategory-indexSort">
        <p>
          <span> Showing 1-{visibleProducts} </span> out of {all_product.length} products
        </p>
        {/* Utilisez un élément de sélection pour permettre à l'utilisateur de choisir le type de tri */}
        <select className="shopcategory-sort" value={sortType} onChange={handleSortChange}>
          <option value="default">Default</option>
          <option value="alphabetical">alphabetical</option>
          <option value="priceLowToHigh">Price: Low to High</option>
          <option value="priceHighToLow">Price: High to Low</option>
        </select>
      </section>
      <section className="shopcategory-product">
        {/* Affichage des produits */}
        {productsToShow.map((item, i) => (
          <Items
            key={i}
            id={item._id}
            name={item.designation}
            img={item.imageartpetitf}
            new_price={item.prixSolde}
            old_price={item.prixVente}
            marque={item.marque}
          />
        ))}
      </section>
      
        <button className="shopCategory-loadMore" onClick={handleLoadMore}>Explore More</button>
      
    </section>
  );
};

export default ShopCategory;
