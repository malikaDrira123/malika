import "./App.css";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";

import sport_banner from "../src/components/assets/sport_banner.png";
import beauty_banner from "../src/components/assets/beauty_banner.png"
import tech_banner from "../src/components/assets/tech_banner.png";
import { Shop, Cart, LoginSignup, Product, ShopCategory } from "./pages/index";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppAdmin from "./pages/dashboardadmin/AppAdmin";


import EditArticle from './pages/dashboardadmin/components/Article/EditArticle'
import InsertArticle from './pages/dashboardadmin/components/Article/InsertArticle'
import ListeArticle from './pages/dashboardadmin/components/Article/ListeArticle'

import Listcategories from './pages/dashboardadmin/components/Categorie/Listcategories'
import InsertCategorie from './pages/dashboardadmin/components/Categorie/InsertCategorie'
import EditCategorie from './pages/dashboardadmin/components/Categorie/EditCategorie'
import ListCategorieCard from './pages/dashboardadmin/components/Categorie/ListCategorieCard'

import ListeScategorie from './pages/dashboardadmin/components/Scategorie/ListeScategorie'
import InsertScategorie from './pages/dashboardadmin/components/Scategorie/InsertScategorie'
import EditScategorie from './pages/dashboardadmin/components/Scategorie/EditScategories'

import ListeUser from './pages/dashboardadmin/components/User/ListeUser'
import InsertUser  from './pages/dashboardadmin/components/User/InsertUser'
import EditUser from './pages/dashboardadmin/components/User/EditUser'
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./components/contact/Contact";

function App() {


  const isNotAdminRoute = ! window.location.pathname.includes('/admin')
  return (
   
      <BrowserRouter>
      <Routes><Route path="/admin" element={<AppAdmin />} />
      <Route path="/art/listart" element={<ListeArticle />} />
          <Route path="/art/insertart/" element={<InsertArticle />} />
          <Route path="/art/editart/:id" element={<EditArticle />} />

          <Route path="/cat/listcat" element={<Listcategories />} />
          <Route path="/cat/insertcat/" element={<InsertCategorie/>} />
          <Route path="/cat/editcat/:id" element={<EditCategorie />} />
          <Route path="/cat/ListCategorieCard" element={<ListCategorieCard/>} />

          <Route path="/souscat/listsouscat" element={<ListeScategorie />} />
          <Route
            path="/souscat/insertsouscat/"
            element={<InsertScategorie />}
          />
          <Route path="/souscat/editsouscat/:id" element={<EditScategorie/>} />

           <Route path="/user/listUser" element={<ListeUser />} />
         <Route path="/user/insertUser" element={<InsertUser />} />
          <Route path="/user/editUser/:id" element={<EditUser />} />
          <Route path="/se-connecter" element={<Login />} />
      <Route path="/inscription" element={<Register />} />
          </Routes>
        {isNotAdminRoute && <Navbar /> }
        <Routes>
          
          <Route path="/" element={<Shop />} />
          <Route
            path="/sport"
            element={<ShopCategory banner={sport_banner} category="sport" />}
          />
          <Route
            path="/beauty"
            element={<ShopCategory banner={beauty_banner} category="beauty" />}
          />
          <Route
            path="/tech"
            element={<ShopCategory banner={tech_banner} category="tech" />}
          />

          <Route path="/product" element={<Product />}>
            <Route path=":productId" element={<Product />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        {isNotAdminRoute && <Footer /> }
      </BrowserRouter>
   
  );
}

export default App;
