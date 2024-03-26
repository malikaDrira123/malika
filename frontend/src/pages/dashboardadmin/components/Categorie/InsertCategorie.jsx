import React, { useState } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Divider, Grid, TextField } from '@mui/material';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { useNavigate } from 'react-router-dom';
import { CategorieService } from '../../Services/CategorieService';
import { toast } from 'react-toastify';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const InsertCategorie = () => {
  const [nomcategorie, setNomCategorie] = useState('');
  const [files, setFiles] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const objetcategorie = {
      nomcategorie,
      imagecategorie: files ? `images/${files[0].filename}` : null,
    };

    try {
      await CategorieService.addCategorie(objetcategorie);

      toast.success('Catégorie ajoutée avec succès', {
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
      console.error('Erreur lors de l\'ajout de la catégorie :', error);

      toast.error('Erreur lors de l\'ajout de la catégorie', {
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
    <form autoComplete="off">
      <Card>
        <CardHeader subheader="Les informations peuvent être éditées" title="Catégorie" />
        <Divider />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
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
            <Grid item xs={12} md={6}>
              <Box sx={{ width: '100%', height: 50, margin: 2 }}>
                <FilePond
                  files={files}
                  allowMultiple={false}
                  labelIdle='<span class="filepond--label-action">Browse One</span>'
                  onupdatefiles={(fileItems) => setFiles(fileItems)}
                />
              </Box>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
          <Button
            onClick={(event) => handleSubmit(event)}
            style={{ marginRight: 10 }}
            color="primary"
            variant="contained"
          >
            Enregistrer
          </Button>
          <Button onClick={() => navigate('/cat/listcat')} color="primary" variant="contained">
            Annuler
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default InsertCategorie;
