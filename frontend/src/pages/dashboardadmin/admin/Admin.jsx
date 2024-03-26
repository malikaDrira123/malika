import React from "react";
import "./admin.css";
import { Routes, Route } from "react-router-dom";

import ListeArticle from "../components/Article/ListeArticle";
import EditArticle from "../components/Article/EditArticle";
import Listcategories from "../components/Categorie/Listcategories";
import InsertCategorie from "../components/Categorie/InsertCategorie";
import EditCategorie from "../components/Categorie/EditCategorie";
import ListCategorieCard from "../components/Categorie/ListCategorieCard";
import ListeScategorie from "../components/Scategorie/ListeScategorie";
import InsertScategorie from "../components/Scategorie/InsertScategorie";
import EditScategorie from "../components/Scategorie/EditScategories";
import ListeUser from "../components/User/ListeUser";
import InsertUser from "../components/User/InsertUser";
import EditUser from "../components/User/EditUser";

import "../../dashboardadmin/assets/libs/boxicons-2.1.1/css/boxicons.min.css";

import "../scss/App.scss";

import Blank from "../pages/Blank";
import Dashboard from "../pages/Dashboard";
import MainLayout from "../layout/MainLayout";

const Admin = () => {
  return (
    <section className="admin">
      {/* <SlideBar/> */}
      <Routes>
      
        <Route path="/art/listart" element={<ListeArticle />} />
        <Route path="/art/editart/:id" element={<EditArticle />} />
        <Route path="/cat/listcat" element={<Listcategories />} />
        <Route path="/cat/insertcat/" element={<InsertCategorie />} />
        <Route path="/cat/editcat/:id" element={<EditCategorie />} />
        <Route path="/cat/ListCategorieCard" element={<ListCategorieCard />} />
        <Route path="/souscat/listsouscat" element={<ListeScategorie />} />
        <Route path="/souscat/insertsouscat/" element={<InsertScategorie />} />
        <Route path="/souscat/editsouscat/" element={<EditScategorie />} />
        <Route path="/user/listUser" element={<ListeUser />} />
        <Route path="/user/insertUser" element={<InsertUser />} />
        <Route path="/user/editUser/:id" element={<EditUser />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="orders" element={<Blank />} />
          <Route path="products" element={<Blank />} />
          <Route path="customers" element={<Blank />} />
          <Route path="settings" element={<Blank />} />
          <Route path="stats" element={<Blank />} />
        </Route>
        
      </Routes>
    </section>
  );
};

export default Admin;
