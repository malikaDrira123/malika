import React, { useState } from 'react';
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
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { useNavigate } from 'react-router-dom';
import { ScategorieService } from '../../Services/ScategorieService';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const InsertScategorie = () => {
  const [nomscategorie, setNomScategorie] = useState('');
  const [files, setFiles] = useState('');
  const [filesm, setFilesm] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const imagePaths = [];
    filesm.forEach((element) => {
      imagePaths.push('/images/' + element.file.name);
    });

    const scategorieObject = {
      nomscategorie,
      imagescategorie: files ? `images/${files[0].filename}` : null,
    };

    try {
      // Call the addScategorie function from the ScategorieService
      await ScategorieService.addScategorie(scategorieObject);

      // You can add a toast or other feedback here
      
      navigate('/souscat/listsouscat');
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la sous-catégorie :', error);
    }
  };

  return (
    <>
      <form autoComplete="off">
        <Card>
          <CardHeader
            subheader="Les informations peuvent être éditées"
            title="Sous-catégorie"
          />
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
            <Button
              onClick={(event) => handleSubmit(event)}
              style={{ marginRight: 10 }}
              color="primary"
              variant="contained"
            >
              Enregistrer
            </Button>
            <Button
              onClick={() => navigate('/scat/listscat')}
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
};



export default InsertScategorie;
