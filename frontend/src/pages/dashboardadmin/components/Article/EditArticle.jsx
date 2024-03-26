// Importation des hooks useState et useEffect depuis React
import  { useState,useEffect} from "react";
// Importation des composants et des éléments de design depuis Material-UI
import {Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
MenuItem // Utilisé pour les éléments de menu déroulant
} from  '@mui/material';
// Importation de la fonction toast depuis react-toastify pour afficher des messages d'alerte
import { toast } from 'react-toastify';
// Importation des composants FilePond et de la fonction registerPlugin depuis react-filepond
import { FilePond,registerPlugin } from 'react-filepond'
// Importation des styles par défaut de FilePond
import 'filepond/dist/filepond.min.css';
// Importation des plugins pour le traitement des images avec FilePond
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
// Importation des styles pour les plugins de FilePond
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
// Importation des hooks useNavigate et useParams depuis react-router-dom pour la navigation et la récupération des paramètres d'URL
import { useNavigate, useParams } from "react-router-dom";
// Importation des services pour gérer les articles, les catégories et les sous-catégories

import { ArticleService } from "../../Services/ArticleService";
import { CategorieService } from "../../Services/CategorieService";
import { ScategorieService } from "../../Services/ScategorieService";
 
// Enregistrement des plugins FilePond
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

const EditArticle = () => {
   // Récupérer l'ID de l'article depuis les paramètres d'URL 
 const {id}= useParams();
   // Permet de naviguer entre les pages
  const navigate=useNavigate();
  // États pour stocker les données de l'article et les mises à jour
  const [reference, setReference] = useState("");
  const [designation, setDesignation] = useState("");
  const [categorieID, setCatID] = useState("");
  const [categories, setCategories] = useState([]);
  // const [prixAchat, setPrixAchat] = useState("");
  const [prixVente, setPrixVente] = useState("");
  // const [prixSolde, setPrixSolde] = useState("");
  const [marque, setMarque] = useState("");
  const [scategories, setscategories] = useState([]);
  const [scategorieID, setSCatID] = useState("");
  const [qtestock, setQtestock] = useState("");
  const [caracteristiques, setCaracteristiques] = useState("");
  const [files, setFiles] = useState("")
  const [filesm, setFilesm] = useState([])
  // Utiliser useEffect pour charger les données de l'article et les catégories lors du chargement du composant
  useEffect(() => {// Fonction pour récupérer la liste des catégories
    GetListCategories();
   // GetListSousCategories();
    //EDIT ART
     // Charger les données de l'article à partir de son ID
    ArticleService.fetchArticlesByID(id)
    .then(res=>{
      setReference(res.data.reference);
      setDesignation(res.data.designation);
      // setPrixAchat(res.data.prixAchat);
      // setPrixSolde(res.data.prixSolde);
      setPrixVente(res.data.prixVente);
      setCaracteristiques(res.data.caracteristiques);
      setQtestock(res.data.qtestock);
      setMarque(res.data.marque);
      setFiles("/"+res.data.imageartpetitf);
      setFilesm("/"+res.data.imageartpetitf);
    })
    },[id]);
   
   
    const GetListCategories=async()=>{
      CategorieService.fetchCategories()
    .then((res) => {
      
    setCategories(res.data);
    
    });
    }
  
    const GetListSCategories=async(idcat)=>{
      ScategorieService.fetchSCategorieByCAT(idcat)
      .then((res) => {
        
      setscategories(res.data);
      });
      } 

    const handleSubmit = async (event) => {
    event.preventDefault();
     // Vérification des champs vides
  if (!reference || !designation || !prixVente || !marque || !qtestock || !caracteristiques || !files || !filesm || !categorieID || !scategorieID) {
    // Affichage de l'alerte si un champ est vide
    window.alert("Veuillez remplir tous les champs avant d'enregistrer.");
    return; // Arrêt de la fonction si un champ est vide
  }
    const ig=[];
    filesm.forEach(element => {
    ig.push("images/"+element.file.name);
    });
  

  const objetarticle = {
    _id: id,
    reference: reference,
    designation :designation,
    prix:{
    // prixAchat :prixAchat,
    prixVente :prixVente
    // prixSolde :prixSolde,
    },
    marque :marque,
    qtestock:qtestock,
    caracteristiques:caracteristiques,
    imageartpetitf : files?"images/"+files[0].file.name:null,
    imageartgrandf:ig,
    categorieID :categorieID,
    scategorieID:scategorieID
    };
    
    ArticleService.editArticle(objetarticle).then((res)=>{

    
    toast("Article ajouté", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });
    // Afficher une alerte
    window.alert("Article modifié avec succès !");
    navigate("/art/listart") 
    }).catch(error => {
    toast("Erreur Article non ajouté", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });
    });
    
  }
 // Fonction pour annuler l'édition et revenir à la liste des articles
  const annuler = () => {
    navigate("/art/listart") 
  }
   // Retourner le JSX du composant EditArticle
  return (
  <>
    <form  
    autoComplete="off">
     
    <Card>
      <CardHeader
        subheader="The information can be edited"
        title="Article"
      />
      <Divider />
      <CardContent>
        <Grid
          container
          spacing={3}
        >
          {/* Champs pour la saisie des données de l'article */}
          <Grid
            item
            md={4}
            xs={12}
          >
            <TextField
              fullWidth
              //helperText="Please specify the first name"
              label="Référence"
              name="Reference"
              value={reference}
              onChange={(e)=> setReference( e.target.value)}
              
              required
            
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            md={8}
            xs={12}
          >
            <TextField
              fullWidth
              label="Désignation"
              name="designation"
              onChange={(e)=> setDesignation( e.target.value)}
              value={designation}
              required
              
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            md={4}
            xs={12}
          >
            <TextField
              fullWidth
              label="marque"
              name="marque"
              value={marque}
              onChange={(e)=>setMarque( e.target.value)}
              required
             
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            md={4}
            xs={12}
          >
            <TextField
              fullWidth
              label="Quantite"
              name="Quantite"
              value={qtestock}
              onChange={(e)=>setQtestock(e.target.value)}
              type="number"
             
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            md={4}
            xs={12}
          >
            <TextField
              fullWidth
              label="Prix de vente"
              name="prix"
              value={prixVente}
              onChange={(e)=>setPrixVente(e.target.value)}
              required
              type="number"
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
          >
            <TextField
              fullWidth
              label="Select Catégorie"
              name="categorie"
              value={categorieID}
              onChange={(event)=>{setCatID(event.target.value); GetListSCategories(event.target.value)} }
              select
              variant="outlined"
            >
              {
               categories ?categories.map(cat=>
               <MenuItem key={cat._id}
               value={cat._id}>{cat.nomcategorie}
              </MenuItem>
               ):null}
            </TextField>
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
          >
            <TextField
              fullWidth
              select
              label="Select sous Catégorie"
              name="scategorie"
              value={scategorieID}
              onChange={(event) =>{ setSCatID(event.target.value);  }}
              >
            {
             scategories ?
           scategories.map((scat)=>

           <MenuItem key={scat._id}
           value={scat._id}>{scat.nomscategorie}</MenuItem>
           ):null}

            </TextField>
          </Grid>
          <Divider />
          <CardHeader
      
        title="Sélectionner une image"
      />
      <Divider />
      <CardContent></CardContent>
          
<Grid>
<section style={{width:400, height:50, margin:10}}>
<FilePond
files={files}
allowMultiple={false}
onupdatefiles={setFiles}
labelIdle='<span class="filepond--label-action">Browse One</span>'
/>
</section>
</Grid>
<Grid >
<section style={{width:400, height:40,margin:10}}>
<FilePond
files={filesm}
allowMultiple={true}
onupdatefiles={setFilesm}
labelIdle='<span class="filepond--label-action">Browse Many</span>'
/>
</section>
</Grid>
        </Grid>
      </CardContent>
      <Divider />
       {/* Boutons pour enregistrer ou annuler l'édition */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2,
          
        }}
      >
        <Button onClick={(event)=>handleSubmit(event) } style={{marginRight : 10 }}
          color="primary"
          variant="contained"
        >
          Enregistrer
        </Button>
        <Button onClick={()=>annuler() }
          color="primary"
          variant="contained"
        >
           Annuler
        </Button>
      </Box>
      
    </Card>
  </form>  
  </>
       
        
  
  );
}

export default EditArticle;

