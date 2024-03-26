import React, { useEffect, useState } from 'react';

import "./newCollections.css";
import Items from '../items/Items';

const NewCollections = () => {

  const [newCollection, setNewCollection] = useState([]);

  useEffect(() => {
    fetch('http://localhost:9000/newCollection')
    .then((res) => res.json())
    .then((data) => setNewCollection(data));
  },[])

  return (
    <section className='newCollection'>
       <h1> NEW COLLECTIONS</h1>
       <hr />
       <section className="collections">
          {newCollection.map((item, i)=>{
            return (
            
                <Items 
                key={i}
            id={item._id}
            name={item.description}
            img={item.imageartpetitf}
            new_price={item.prixSolde}
            old_price={item.prixVente}
            marque={item.marque}
                                  
                />
            
            );
          })}
       </section>
    </section>
  )
}

export default NewCollections;