import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import list_product_icon from "../../../../assets/Product_list_icon.svg";
import sidebarNav from '../../configs/sidebarNav'; // Ne pas importer sidebarNav ici
import "./sidebar.scss"; // Importez le fichier .scss sans l'extension .scss

import images from "../../constants/images";

const SlideBar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const curPath = window.location.pathname.split("/")[1];
    const activeItem = sidebarNav.findIndex((item) => item.section === curPath);

    setActiveIndex(curPath.length === 0 ? 0 : activeItem);
  }, [location]);

  const closeSidebar = () => {
    const mainContent = document.querySelector(".main__content");
    if (mainContent) {
      mainContent.style.transform = "scale(1) translateX(0)";
      setTimeout(() => {
        document.body.classList.remove("sidebar-open");
        mainContent.style = "";
      }, 500);
    }
  };

  return (
    <section className="sidebar">
         <section className="sidebar__logo">
                <img src={images.logo} alt="" />
                <section className="sidebar-close" onClick={closeSidebar}>
                    <i className='bx bx-x'></i>
                </section>
            </section>
      <section className="sidebar__menu">
        {sidebarNav.map((nav, index) => (
          <Link
            to={nav.link}
            key={`nav-${index}`}
            className={`sidebar__menu__item ${
              activeIndex === index ? "active" : ""
            }`}
            onClick={closeSidebar}
          >
            <section className="sidebar__menu__item__icon">{nav.icon}</section>
            <section className="sidebar__menu__item__txt">{nav.text}</section>
          </Link>
        ))}
      </section>

      <section className="sidebar__menu">
        <Link to="/user/listUser" style={{ textDecoration: "none" }}>
        <section className="sidebar__menu__item">
          <section className="sidebar__menu__icon">
            <img src={list_product_icon} alt="" />
            <section className="sidebar__menu__item__txt">
              <p>Users</p>
            </section>
            </section>
          </section>
        </Link>

        <Link to="/cat/listcat" style={{ textDecoration: "none" }}>
        <section className="sidebar__menu__item">
          <section className="sidebar__menu__icon">
            <img src={list_product_icon} alt="" />
            <section className="sidebar__menu__item__txt">
              <p>Categories</p>
            </section>
          </section>
          </section>
        </Link>

        <Link to="/souscat/listsouscat" style={{ textDecoration: "none" }}>
        <section className="sidebar__menu__item">
          <section className="sidebar__menu__icon">
            <img src={list_product_icon} alt="" />
            <section className="sidebar__menu__item__txt">
              <p>Sous Categories</p>
            </section>
          </section>
          </section>
        </Link>

        <Link to="/art/listart" style={{ textDecoration: "none" }}>
        <section className="sidebar__menu__item">
          <section className="sidebar__menu__icon">
            <img src={list_product_icon} alt="" />
            <section className="sidebar__menu__item__txt">
              <p>Articles</p>
            </section>
          </section>
          </section>
        </Link>
      </section>

      <section className="sidebar__menu">
        <section className="sidebar__menu__item">
          <section className="sidebar__menu__item__icon">
            <i className="bx bx-log-out"></i>
          </section>
          <section className="sidebar__menu__item__txt">
          <Link to="/signin" style={{ textDecoration: "none" }}>
          
            Logout
           
            </Link>
             </section>
        </section>
      </section>
    </section>
  );
};

export default SlideBar;
