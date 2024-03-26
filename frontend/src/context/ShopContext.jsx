import React, { createContext, useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const shopContext = createContext();


const getDefaultvalue = () => {
  let cart = {};
  for (let index = 0; index < 300 + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [all_product, setAll_product] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultvalue());

  const fetchData = async () => {
    try {
      // Fetch product data
      const productResponse = await fetch("http://localhost:9000/api/articles");
     if (!productResponse.ok) {
  throw new Error(`HTTP error! Status: ${productResponse.status}`);
} 
      const productData = await productResponse.json();
     
      setAll_product(productData);

      const user = JSON.parse(localStorage.getItem('user'));
      
        const cartResponse = await fetch(`http://localhost:9000/api/getCart/${user.id}`);
        const cartData = await cartResponse.json();
        setCartItems(cartData);
      
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle errors
    }
  };

  const articlesByCategory = async (id) => {
    
    try {
      // Fetch product data
      const productResponse = await fetch(`http://localhost:9000/api/articles/category/${id}`);
      const productData = await productResponse.json();
      
      setAll_product(productData);


      const user = JSON.parse(localStorage.getItem('user'));
      const authToken = localStorage.getItem("Authorization");
     
          const cartResponse = await fetch(`http://localhost:9000/api/users/getCart/${user.id}`);
        const cartData = await cartResponse.json();
       
        setCartItems(cartResponse);
     

      return productData;
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle errors
    }
  };

  useEffect(() => {
    articlesByCategory();
  }, []);

  // Fonction pour ajouter un article au panier
  const addToCart = async(item) => {
  
    //setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    const user = JSON.parse(localStorage.getItem('user'));
    const authToken = localStorage.getItem("Authorization");
    if (user) {
      
    
     const response = await fetch(`http://localhost:9000/api/users/addToCart/${user.id}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
        
         // 'Authorization': 'Bearer '+ token,
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem("Authorization")}`
        },
        body:JSON.stringify({ 
          item: {...item,
           price:item.price,
          quantity: 1,
        total:item.price* item.quantity}
          
        }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          
          // Handle success, update UI, etc.
           toast.success('Ajouté avec succès', {
            position: 'bottom-right',
            autoClose: 3000 // Disparaît après 3 secondes
          });
        })
        .catch((error) => {
          console.error("Error:", error);
          // Handle error, update UI, show user a message, etc.
        });
    }
  };



  
  // Fonction pour supprimer un article du panier
  const removeFromCart = async (idProduct ) => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (user) { // Vérifie si le jeton d'authentification existe
       const cartResponse = await fetch(`http://localhost:9000/removeFromCart/user/${user.id}/product/${idProduct}`, { // Envoie une requête POST à l'URL spécifiée
        method: "DELETE", // Utilise la méthode HTTP POST
        headers: { // Spécifie les en-têtes de la requête
          Accept: "application/json", // Accepte les données au format JSON
          "Content-Type": "application/json", // Type de contenu de la requête : JSON
          'Authorization': `Bearer ${localStorage.getItem("authToken")}` // Ajoute le jeton d'authentification dans l'en-tête
        }
      })



    const cartData = await cartResponse.json(); 

      setCartItems(cartData);
      window.location.reload();
  
    }}
    

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find((product) => product.id === Number(item));
        // Vérifiez si itemInfo est défini et s'il contient la propriété new_price
      if (itemInfo && itemInfo.new_price !== undefined) {
        totalAmount += itemInfo.new_price * cartItems[item];
      }else {
        console.warn(`Produit non trouvé ou prix manquant pour l'ID: ${item}`);
      }
    }}
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItems = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItems += cartItems[item];
      }
    }
    return totalItems;
  };

  const fetchDataCart = async () => {
    try {
      // Fetch product data
      const productResponse = await fetch("http://localhost:9000/allProduct");
      const productData = await productResponse.json();
      setAll_product(productData);

      // Check if the user is logged in and fetch cart data accordingly
      const authToken = localStorage.getItem("Authorization");
      if (authToken) {
        const cartResponse = await fetch("http://localhost:9000/getCart", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Authorization": authToken,
            "Content-type": "application/json",
          },
        });
        const cartData = await cartResponse.json();
        setCartItems(cartData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle errors
    }
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    fetchDataCart,
    addToCart,
    removeFromCart,
    articlesByCategory
  };

  return <shopContext.Provider value={contextValue}>{props.children}</shopContext.Provider>;
};

export default ShopContextProvider;
