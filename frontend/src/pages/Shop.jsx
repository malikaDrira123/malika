import React from 'react'
import Hero from '../components/Hero/Hero'
// import Popular from '../components/popular/Popular'
import Offers from '../components/offers/Offers'
import NewCollections from '../components/newCollections/NewCollections'
import NewsLatter from '../components/newsLatter/NewsLatter'

const Shop = () => {
  return (
    <>
       <Hero />
        <NewCollections/>
       {/* <Popular /> */}
       <Offers />
      
       
       <NewsLatter/>
    </>
    
  )
}

export default Shop
