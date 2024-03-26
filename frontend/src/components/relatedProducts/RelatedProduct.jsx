import React from 'react'
import "./relatedProduct.css"
import data_product from "../assets/data"
import Item from "../items/Items"

const RelatedProduct = () => {
  return (
    <section className='relatedProducts'> 
      <h1> Related Product</h1>
      <hr />
      <section className="relatedProduct-item">
          {data_product.map((item ,i)=>{
      return <Item 
            key={i} 
            id={item.id}
            name={item.name} 
            img={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
            />
          })}
      </section>
    </section>
  )
}

export default RelatedProduct
