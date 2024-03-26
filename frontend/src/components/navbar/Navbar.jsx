import React, { useContext, useState } from 'react';
import './navbar.css';
import { useRef } from 'react';
import logo from "../assets/logo.png";
import cart_icon from "../assets/cart_icon.png";
import { Link } from 'react-router-dom';
import { shopContext } from '../../context/ShopContext';
import nav_dropdown from "../assets/down-arrow.png";

// Style pour les liens

const linkStyle = {
  textDecoration: 'none',
  color: 'inherit',
  fontFamily: 'Poppins'
};
// Définition du composant Navbar
const Navbar = () => {
 // Utilisation du hook useState pour gérer l'état du menu et de la langue
  const [menu, setMenu] = useState("shop");
  const [language, setLanguage] = useState("en");
  
   // Utilisation du hook useContext pour accéder au contexte shopContext
  const { getTotalCartItems, articlesByCategory } = useContext(shopContext);
   // Création d'une référence pour le menu déroulant
  const menuRef = useRef();
// Fonction pour afficher/masquer le menu déroulant
  const dropdownToggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  };
  // Fonction pour changer la langue
  const changeLanguage = (e) => {
    setLanguage(e.target.value);
  };
 // Fonction pour obtenir le texte du menu dans la langue sélectionnée
  const getMenuText = (menuKey) => {
    // Fonction pour obtenir le texte du menu dans la langue sélectionnée
    switch (menuKey) {
      case 'shop':
        return language === 'en' ? 'Shop' : 'Boutique';
      case 'sport':
        return language === 'en' ? 'Sport' : 'Sport';
      case 'Beauty & Health':
        return language === 'en' ? 'Beauty & Health' : 'Beauté & Santé';
      case 'High-Tech':
        return language === 'en' ? 'High-Tech' : 'Technologies';
        case 'Login':
        return language === 'en' ? 'Login' : 'Conexion';
        case 'Logout':
        return language === 'en' ? 'Logout' : 'Déconnexion';
        case 'Contact':
        return language === 'en' ? 'Contact' : 'Contactez-nous';
      default:
        return '';
    }
  };
// Rendu du composant Navbar
  return (
    <section className='navbar'>
        {/* Logo */}
      <article className="nav-logo">
        <article className='content'>
          <img src={logo} alt="logo" width={"180px"} height={"180px"} className="logo" />
        </article>
      </article>
     {/* Menu de navigation */}
      <ul ref={menuRef} className="nav-menu">
        <li onClick={() => { setMenu("shop") }} className='elementMenuShop'>
          <Link style={linkStyle} to="/">{getMenuText('shop')}</Link>
          {menu === "shop" ? <hr /> : <></>}
        </li>
        <li onClick={() => { articlesByCategory('60a16051c1b48f332c9740c2') }} className='elementMenuSport'>
          <Link style={linkStyle} to="/sport">{getMenuText('sport')}</Link>
          {menu === "sport" ? <hr /> : <></>}
        </li>
        <li onClick={() => { articlesByCategory('60a16099c1b48f332c9740c4') }} className='elementMenuBeauty'>
          <Link style={linkStyle} to="/beauty">{getMenuText('Beauty & Health')}</Link>
          {menu === "Beauty & Health" ? <hr /> : <></>}
        </li>
        <li onClick={() => { articlesByCategory('609a83b80c806f32e04bb484') }} className='elementMenuTech'>
          <Link style={linkStyle} to="/tech">{getMenuText('High-Tech')}</Link>
          {menu === "High-Tech" ? <hr /> : <></>}
        </li>
      </ul>
  {/* Bouton pour afficher/masquer le menu déroulant */}
      <img onClick={dropdownToggle} src={nav_dropdown} alt="" className='nav-dropdown' />
 {/* Section pour le bouton de connexion, le bouton de déconnexion, le lien de contact et l'icône de panier */}
      <section className="nav-login-cart">
       {/* Sélecteur de langue */}
      <select value={language} onChange={changeLanguage}> 
   <option value="en">
  <img
        src="../assets/flag-uk.png"
        alt="English"
        className="mr-2 flag-icon"
      style={{ width: '20px', marginRight: '5px' }}/>{" "}
      <i className="fa fa-angle-down ml-2" aria-hidden="true" />
    
  
    English
    
  </option>
  <option value="fr">
  <img
          src="../assets/flag-france.png"
          alt="French"
          className="mr-2 flag-icon"
          style={{ width: '20px', marginRight: '5px' }}
        />{" "}
         
    Français
  </option>
</select>
 {/* Bouton de connexion/déconnexion */}
 {/* localStorage.getItem('auth-token') est une condition ternaire. Elle vérifie si un élément appelé 'auth-token' est présent dans le stockage local du navigateur. */}
        {localStorage.getItem('auth-token') ?
          <button onClick={() => {
        //  Si un token est présent, cela signifie que l'utilisateur est connecté. Dans ce cas, un bouton de déconnexion est affiché.
          //  Lorsque ce bouton est cliqué, le token d'authentification est supprimé du stockage local à l'aide de localStorage.removeItem('auth-token').
            localStorage.removeItem('auth-token');
          //  la page est redirigée vers la page d'accueil à l'aide de window.location.replace("/").
            window.location.replace("/");
            
          }}>{getMenuText('Logout')}  </button>
          :
          <Link style={linkStyle} to="/login"> <button>{getMenuText('Login')}</button> </Link>
        }
         {/* Lien vers la page de contact */}
        <Link style={linkStyle} to="/contact">
          <button>{getMenuText('Contact')}</button>
        </Link>
        {/* Icône du panier avec le nombre total d'articles  est obtenu en appelant la fonction getTotalCartItems()*/}
        <Link style={linkStyle} to="/cart">
          <img src={cart_icon} alt="cart" />
        </Link>
        <article className="nav-cart-count">
          {getTotalCartItems()}
        </article>
      </section>
    </section>
  )
}

export default Navbar;
