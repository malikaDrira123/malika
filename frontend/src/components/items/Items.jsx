import React from 'react'
import "./items.css"
import { Link } from 'react-router-dom'

const Items = (props) => {
  
  return (
    <section className='item'>
      {/* Lien vers la page du produit avec son ID */}
      <Link to={`/product/${props.id}`}>
      {/* Image du produit */}
        {/* Lorsque l'image est cliquée, la fenêtre de navigation est scrollée à la position (1,2) */}
      <img onClick={window.scrollTo(1,2)} src={`http://malikadrira.ide.3wa.io:9000/assets/${props.img}`} alt="" /></Link>
        {/* Nom du produit et marque */}
       <p>{props.name} <span> {props.marque}</span></p>
         {/* Section pour afficher les prix */}
       <section className="item-prices">
          <article className="item-prices-new">
          {props.old_price}€
          </article>
          <article className="item-prices-old">
             {/* {props.old_price}€ */}
          </article>
       </section>
    </section>
  )
}

export default Items
