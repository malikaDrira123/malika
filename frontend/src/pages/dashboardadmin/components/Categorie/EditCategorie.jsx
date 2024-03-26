import  { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from '@mui/material';
import {  toast } from 'react-toastify';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { useNavigate, useParams } from 'react-router-dom';
import { CategorieService } from '../../Services/CategorieService';



registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const EditCategorie = () => {
  const { id } = useParams();
const navigate = useNavigate();
  
  const [nomcategorie, setNomCategorie] = useState('');
  const [files, setFiles] = useState("");
  const [filesm, setFilesm] = useState([]);

  useEffect(() => {
    // Éditer la catégorie
    CategorieService.fetchCategoriesByID(id)
      .then((res) => {

        setNomCategorie(res.data.nomcategorie);
        // S'il y a déjà une image pour la catégorie, initialisez les fichiers avec cette image
        if (res.data.imagecategorie) {
          setFiles([{
            source: res.data.imagecategorie,
            options: { type: 'local' },
          }]);
        }
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération de la catégorie :', error);
        console.error(error);
      });
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const ig = [];

    filesm.forEach((element) => {
      ig.push("/images/" + element.file.name);
    });

    // Construire l'objet catégorie avec les données modifiées
    const objetcategorie = {
      _id: id,
      nomcategorie,
      imagecategorie: files.length ? `images/${files[0].file.name}` : null,
    };

    try {
      // Appeler la fonction d'édition de catégorie
      const res = await CategorieService.editCategorie(objetcategorie);
   
      toast('Catégorie modifiée avec succès', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate('/cat/listcat');
    } catch (error) {
      console.error('Erreur lors de l\'édition de la catégorie :', error);
      toast('Erreur lors de l\'édition de la catégorie', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      <form autoComplete="off">
        <Card>
          <CardHeader subheader="Les informations peuvent être éditées" title="Catégorie" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={4} xs={12}>
                <TextField
                  fullWidth
                  label="Nom"
                  name="Nom"
                  value={nomcategorie}
                  onChange={(e) => setNomCategorie(e.target.value)}
                  required
                  variant="outlined"
                />
              </Grid>
              <Divider />
              <CardHeader title="Sélectionner une image" />
              <Divider />
              <CardContent>
                <Grid>
                  <span style={{ width: 400, height: 50, margin: 10 }}>
                    <FilePond
                      files={files}
                      allowMultiple={false}
                      labelIdle='<span class="filepond--label-action">Browse One</span>'
                      // Mise à jour des fichiers lors de la sélection
                      onupdatefiles={(fileItems) => setFiles(fileItems)}
                    />
                  </span>
                  
                </Grid>
              </CardContent>
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
            <Button onClick={(event) => handleSubmit(event)} style={{ marginRight: 10 }} color="primary" variant="contained">
              Enregistrer
            </Button>
            <Button onClick={() => navigate('/cat/listcat')} color="primary" variant="contained">
              Annuler
            </Button>
          </Box>
        </Card>
      </form>
    </>
  );
};

export default EditCategorie;
