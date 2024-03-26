import React from 'react';

import MUIDataTable from "mui-datatables";
// import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import { IconButton,Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { pink } from '@mui/material/colors';
import { Link } from "react-router-dom";
import { useSelector} from 'react-redux';
import {toast} from "react-toastify";
import { useDispatch} from 'react-redux';
import { ThemeProvider } from '@emotion/react';
import { deleteArticle } from '../../redux/features/articleSlice';

const ListeArticleT = () => {

    
  const {articles,isLoading}=useSelector((state)=>state.articles);
  const dispatch=useDispatch();

  const delArticle= async (id) => {
    dispatch(deleteArticle(id));
    toast("Article Supprimé", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });
    }
    
     const columns = [
        { label: "Référence", name: "reference" },
        {label: "Désignation", name: "designation" },
        { label: "Prix Achat", name: "prixAchat" },
        { label: "Prix Vente", name: "prixVente" },
        { label: "Marque", name: "marque" },
        { label: "Quatité Stock", name: "qtestock"},
        {name:"imageartpetitf",  label: "Image",
        options: {
        customBodyRender : (rowData) => (
        <img style={{ height: 60, borderRadius: '50%' }} src={`/${rowData}`} alt="" /> )  }
        }, 
        {name:"categorieID", label: "Catégorie",
        options: {
        customBodyRender : (categ) => (
        categ? categ.nomcategorie : null)  }
        },
        { name:"scategorieID", label: "S/Catégorie",
        options: {
        customBodyRender : (scateg) => (
        scateg? scateg.nomscategorie :null ) }
        },
        {
        name: "_id",
        label: "Actions",
        options: {
        customBodyRender: (value) => (
        <section>
        <IconButton >
        { <Link to={"/art/editart/" + value} >
        <EditIcon color='secondary' />
        </Link>
        }
        </IconButton>
        <IconButton onClick={()=>{delArticle(value)}} >
        <DeleteIcon sx={{ color: pink[500] }} />
        </IconButton>
        </section> )
        }
        },
        ];
  return (
    <>
      <section style={{padding:5,margin:5}}>
        
<Button
color="success"
startIcon={<AddCircleIcon />}
variant="contained"
>
{ <Link to={"/art/insertart/"} style={{textDecoration:
"none",color:"white"}}>
Ajouter
</Link>
}
</Button>
</section>
{
(
<ThemeProvider theme={createTheme()}>
<MUIDataTable
title="Liste des articles"
data={articles}

columns={columns}
/>
</ThemeProvider>
)
}
    </>
  );
}

export default ListeArticleT;

