import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import {  toast } from "react-toastify";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { useNavigate, useParams } from "react-router-dom";
import { ServUsers } from "../../Services/UserService";


const InsertUser = () => {
  const navigate = useNavigate();
  const{ id } = useParams();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [password, setpassword] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const objetuser = {
      _id: id,
      name: name,
      email: email,
      telephone: telephone,
      password: password,
    };
    ServUsers.addUser(objetuser)
      .then((res) => {
       

        toast("user ajouté", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/user/listUser");
      })
      .catch((error) => {
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
  };
  return (
    <>
      <form autoComplete="off">
        <Card>
          <CardHeader subheader="The information can be edited" title="user" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  //helperText="Please specify the first name"
                  label="name"
                  name="name"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="password"
                  name="password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="email"
                  name="email"
                  onChange={(e) => setemail(e.target.value)}
                  value={email}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="telephone"
                  name="telephone"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  required
                  variant="outlined"
                />
              </Grid>

              <Divider />
              <CardContent></CardContent>
            </Grid>
          </CardContent>
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
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
              onClick={(event) => handleSubmit(event)}
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

export default InsertUser;
