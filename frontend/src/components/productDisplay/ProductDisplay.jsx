import React from 'react'
import "./productDisplay.css"
import  star_icon from "../assets/star_icon.png"
import star_dull_icon from "../assets/star_dull_icon.png"
import {shopContext } from "../../context/ShopContext"
import { useContext } from "react"
import { ToastContainer } from 'react-toastify'

const ProductDisplay = (props) => {

  const {product} = props
  const {addToCart} = useContext(shopContext);
  return (
    <>
    <section className='productDisplay'>

      <section className="productDisplay-left">
        <section className="productDisplay-img-list">
          <img src={`http://localhost:9000/assets/${product.imageartpetitf}`} alt="" />
           <img src={`http://localhost:9000/assets/${product.imageartpetitf}`} alt="" />
            <img src={`http://localhost:9000/assets/${product.imageartpetitf}`} alt="" />
             <img src={`http://localhost:9000/assets/${product.imageartpetitf}`} alt="" />
        </section>
        <section className="productDisplay-img"></section>
           <img src={`http://localhost:9000/assets/${product.imageartpetitf}`} alt=""  className='product-display-main-img'/>
      </section>

      <section className="productDisplay-right">
          <h1>{product.description}</h1>
          <section className="productDisplay-right-stars">
              <img src={star_icon} alt="" />
              <img src={star_icon} alt="" />
              <img src={star_icon} alt="" />
              <img src={star_icon} alt="" />
              <img src={star_dull_icon} alt="" />
              <p>(122)</p>
          </section>
          <section className="productDisplay-right-price">
            <section className="productDisplay-right-price-old">
              {product.prixVente}€
            </section>
            <section className="productDisplay-right-price-new">
              {product.prixSolde}€
            </section>
          </section>  
          <section className="productDisplay-right-description">
          {product.designation}          </section>
         
            <button onClick={()=> { addToCart(product)}}>ADD TO CARD</button>
            <p className='productDisplay-right-category'>
              <span>Category :</span> {product.categorieID.nomcategorie}
            </p>
            <ToastContainer />
      </section>

    </section>
    <section className="descriptionBox">
    <section className="descriptionBox-navigator">
      <section className="description-nav-box">Description</section>
      <section className="description-nav-box fade"> Reviews (125)</section>
    </section> 
    <section className="descriptionBox-description">
      <p>
        {product.caracteristiques}
      </p>
    </section>
  </section>
  

</>
  )
}

export default ProductDisplay
