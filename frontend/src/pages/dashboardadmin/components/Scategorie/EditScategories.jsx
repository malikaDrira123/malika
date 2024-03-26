import React, { useState, useEffect } from 'react';
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
import { toast } from 'react-toastify';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { useNavigate, useParams } from 'react-router-dom';
import { ScategorieService } from '../../Services/ScategorieService';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const EditScategorie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
 
  const [nomscategorie, setNomScategorie] = useState('');
  const [files, setFiles] = useState("");
  const [filesm, setFilesm] = useState([]);

  useEffect(() => {
    ScategorieService.fetchScategoriesByID(id)
      .then((res) => {
        setNomScategorie(res.data.nomscategorie);
        if (res.data.imagescategorie) {
          setFiles([{
            source: res.data.imagescategorie,
            options: { type: 'local' },
          }]);
        }
      })
      .catch((error) => {
        console.error('Error fetching subcategory:', error);
      });
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const ig = [];

    filesm.forEach((element) => {
      ig.push("/images/" + element.file.name);
    });
    // const imagePaths = filesm.map((element) => "/images/" + element.file.name);

    const objetscategorie = {
      _id: id,
      nomscategorie,
      imagescategorie: files.length ? `images/${files[0].file.name}` : null,
    };

    try {
      const res = await ScategorieService.editScategorie(objetscategorie);

      toast('Sous-catégorie modifiée avec succès', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      navigate('/souscat/listsouscat');
    } catch (error) {
      console.error('Erreur lors de l\'édition de la sous-catégorie :', error);
      toast('Erreur lors de l\'édition de la sous-catégorie', {
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
          <CardHeader subheader="Les informations peuvent être éditées" title="Sous-catégorie" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={4} xs={12}>
                <TextField
                  fullWidth
                  label="Nom"
                  name="Nom"
                  value={nomscategorie}
                  onChange={(e) => setNomScategorie(e.target.value)}
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
            <Button onClick={() => navigate('/souscat/listsouscat')} color="primary" variant="contained">
              Annuler
            </Button>
          </Box>
        </Card>
      </form>
    </>
  );
};

export default EditScategorie;
