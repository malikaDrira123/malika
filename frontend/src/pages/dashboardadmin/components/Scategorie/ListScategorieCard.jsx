import React from "react";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ScategorieService } from "../../Services/ScategorieService";




const ListScategorieCard = () => {
  const [scategories, setScategories] = useState([]);
  useEffect(() => {
    GetListScategories();
  });
  const GetListScategories = async () => {
    ScategorieService.fetchScategories().then((res) => {
      setScategories(res.data);
    });
  };
  return (
    <section className="container">
      <section
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "left" }}
      >
        {scategories.map((scat, ind) => {
          return (
            <Card sx={{ maxWidth: "auto", margin: 1 }}>
              <CardMedia
                component="img"
                alt="green iguana"
                height="160"
                image={scat.imagescat}
              />

              <CardContent>
                <Typography gutterBottom variant="h5" component="section">
                  {scat.nomscategorie}
                </Typography>
                
              </CardContent>

              <CardActions>
                <Button
                  disabled={scat.qtestock <= 1}
                  variant="contained"
                  color="secondary"
                  size="large"
                >
                  {scat.qtestock <= 1 ? "OUT OF SOLD" : "Add to cart"}
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </section>
    </section>
  );
};
export default ListScategorieCard;
