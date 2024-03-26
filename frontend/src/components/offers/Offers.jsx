import React from 'react'
import "./offers.css"
import exclusive_img from "../assets/exclusive_image.png"

const Offers = () => {
  return (
    <section className='offers'>
        <article className="offers-left">
           <h1> Exclusive</h1>
           <h1> offers for you</h1>
           <p>ONLY ON BEST SELLERS PRODUCTS</p>
           <button>Check now</button>
        </article>

        <image className="offers-right">
           <img src={exclusive_img} alt="" />
        </image>
    </section>
  )
}

export default Offers
