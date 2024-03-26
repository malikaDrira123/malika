
import  { useState,useEffect} from "react";
import {Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
MenuItem} from  '@mui/material';

import { FilePond,registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import { useNavigate, useParams } from "react-router-dom";
import { ArticleService } from "../../Services/ArticleService";
import { CategorieService } from "../../Services/CategorieService";
import { ScategorieService } from "../../Services/ScategorieService";


registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)
const InsertArticle = () => {
  
 // Récupérer l'instance de navigateur pour la navigation
  let navigate=useNavigate();
   // Récupérer l'ID de l'article depuis les paramètres d'URL
  let {id}= useParams();
   // États pour stocker les données de l'article et les mises à jour
  const [reference, setReference] = useState("");
  const [designation, setDesignation] = useState("");
  const [categorieID, setCatID] = useState("");
  const [categories, setCategories] = useState([]);
  const [prixAchat, setPrixAchat] = useState("");
  const [prixVente, setPrixVente] = useState("");
  const [prixSolde, setPrixSolde] = useState("");
  const [marque, setMarque] = useState("");
  const [scategories, setscategories] = useState([]);
  const [scategorieID, setSCatID] = useState("");
  const [qtestock, setQtestock] = useState("");
  const [caracteristiques, setCaracteristiques] = useState("");
  const [files, setFiles] = useState("")
  const [filesm, setFilesm] = useState([])

  useEffect(() => {
     // Charger la liste des catégories lors du chargement du composant
    GetListCategories();
    GetListSousCategories();
    },[]);
   
    // Fonction pour récupérer la liste des catégories
    const GetListCategories=async()=>{
      CategorieService.fetchCategories()
    .then((res) => {
      
    setCategories(res.data);
    
    });
    }
 // Fonction pour récupérer la liste des sous-catégories en fonction de la catégorie sélectionnée
 
    const GetListSousCategories=async(idcat)=>{
      ScategorieService.fetchSCategorieByCAT(idcat)
      .then((res) => {
        if(res)
      setscategories(res.data);
      });
      } 
 // Fonction de gestion de la soumission du formulaire
    const handleSubmit = async (event) => {
    event.preventDefault();
 // Vérification des champs vides
 if (!reference || !designation || !prixVente || !marque || !qtestock || !caracteristiques || !files || !filesm || !categorieID || !scategorieID) {
  // Affichage d'une alerte si un champ est vide
  window.alert("Veuillez remplir tous les champs avant d'enregistrer.");
  return; // Arrêt de la fonction si un champ est vide
}

    let ig=[];
    filesm.forEach(element => {
    ig.push("/images/"+ element.file.name);
    });
 

  const objetarticle = {
    _id:id,
    reference: reference,
    designation :designation,
    prixAchat :prixAchat,
    prixVente :prixVente,
    prixSolde :prixSolde,
    marque :marque,
    qtestock:qtestock,
    caracteristiques:caracteristiques,

    categorieID :categorieID,
    scategorieID:scategorieID,

    image: {
      petitformat : files?"images/"+files[0].filename:null,
      grandformat:  ig?ig[0]:null,
    },
    };
    // Ajout de l'article via le service ArticleService
    ArticleService.addArticle(objetarticle).then((res)=>{
 // Affichage d'une alerte pour informer l'utilisateur de l'ajout de l'article
 window.alert("Article ajouté avec succès !");
 // Redirection vers la liste des articles
       
    navigate("/art/listart") 
    }).catch(error => {
   console.error("Erreur lors de l'ajout de l'article :", error);
    });
    
  }
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
              onChange={(event)=>{setCatID(event.target.value); GetListSousCategories(event.target.value)} }
              
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
        <Button onClick={(event)=>handleSubmit(event) }
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

export default InsertArticle;
