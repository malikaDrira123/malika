import React, { useEffect, useState, useContext } from "react";
import "./cartItems.css";
// Import context for accessing global state
import { shopContext } from '../../context/ShopContext';
// Import de l'icône pour le bouton de suppression
import remove_icon from '../assets/cart_cross_icon.png';

// Component for displaying cart items
  const CartItems = () => {
    // Destructure necessary functions and data from context
    const {
      getTotalCartAmount,
    
      removeFromCart
    } = useContext(shopContext);


   
    // État pour stocker les données du panier
    const [cartData, setCartData] = useState([]);

    const handleCheckout = () => {
    
    
        // Afficher un message de paiement effectué
            
         
        alert("Paiement effectué");
        
            // Rediriger vers la page d'accueil
            
        window.location.href = "/";
          };

          const handleRemoveFromCart = (productName) => {
    
            // Supprimer l'article du panier      
                
            removeFromCart(productName);
                            
            // Afficher un message de confirmation
                
            alert(`Do you want to delete the article "${productName}"?`);
            
              };
            
              
              
            

// Récupération des données du panier depuis le serveur à la création du composant
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Récupération des données utilisateur depuis le stockage local
                const user = JSON.parse(localStorage.getItem('user'));
 // Récupération des données du panier depuis le serveur en utilisant l'identifiant utilisateur id
                const cartResponse = await fetch(`http://localhost:9000/api/users/getCart/${user.id}`);
               // Extraction des données JSON de la réponse user id
                const data = await cartResponse.json();
               // Mise à jour de l'état des données du panier avec les données récupérées
                setCartData(data);
            } catch (error) {
                 // Journalisation des erreurs survenues lors de la récupération des données
                console.error("Error fetching data:", error);
            }
        };
// Appel de la fonction fetchData lorsque le composant est monté
        fetchData();
    }, []);

    return (
        <article className='cartItems'>
             {/* Affichage de l'en-tête pour les articles du panier */}
            <span className='cartItems-format-main'>
                <p>Product</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
            </span>
            <hr />
              {/* Vérification de l'existence des données du panier et de leur type tableau */}
            {cartData && Array.isArray(cartData) ? (
                 // Parcours de chaque article du panier et affichage de ses détails
                cartData.map(item => (
                   
                    (
                        <section key={item._id}>
                            <article className="cartItems-format-main cartItems-format">
                                <p>{item.nameProduct}</p>
                                <p>{item.Price}</p>
                                <p>{item.Quantity}</p>
                                <p>{item.Total}</p>
                                 {/* Bouton pour supprimer l'article du panier */}
                                <button className="remove-button" 
                                onClick={() => handleRemoveFromCart(item.nameProduct)}>
                                    <img src={remove_icon} alt="Remove" /></button>
                            </article>
                            <hr />
                        </section>
                    )
                ))
            ) : (
                 // Affichage d'un message si aucune donnée du panier n'est disponible
                <p>No data available</p>
            )}
            <span className="cartItems-down">
                <span className="cartItems-total">
                     {/* Affichage des totaux du panier */}
                    <h1>Cart Totals</h1>
                    <article>
                        <span className="cartItems-total-item">
                            <p>Subtotal</p>
                            <p>{getTotalCartAmount()}€</p>
                        </span>
                        <hr />
                        <span className="cartItems-total-item">
                            <p>Shipping Free</p>
                            <p>Free</p>
                        </span>
                        <hr />
                        <span className="cartItems-total-item">
                            <h3>Total</h3>
                            <h3>{getTotalCartAmount()}€</h3>
                        </span>
                    </article>
                      {/* Bouton pour procéder au paiement */}
                    <button onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
                </span>
                <span className="cartItems-promoCode">
                     {/* Champ de saisie pour le code promo */}
                    <p>you have a promo code, Enter it here</p>
                    <span className="cartItems-promoBox">
                        <input type="text" placeholder='Promo Code' />
                        <button>Submit</button>
                    </span>
                </span>
            </span>
        </article>
    )
}

export default CartItems;
