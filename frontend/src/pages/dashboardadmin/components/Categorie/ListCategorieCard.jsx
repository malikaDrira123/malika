import  { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CategorieService } from "../../Services/CategorieService";





const ListCategorieCard = () => {
  const [categories, setCategorie] = useState([]);

  useEffect(() => {
    GetListCategories();
  }, []);

  const GetListCategories = async () => {
    CategorieService.fetchCategories().then((res) => {
      setCategorie(res.data);
    });
  };

  return (
    <section className="container">
      <article
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "left" }}
      >
        {categories.map((cat, ind) => (
          <Card key={ind} sx={{ maxWidth: "250px", margin: 1 }}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="70"
              image={cat.imagecategorie}
            />

            <CardContent>
              <Typography gutterBottom variant="h5" component="section">
                {cat.nomcategorie}
              </Typography>
            </CardContent>

            <CardActions>
              <Button
                disabled={cat.qtestock <= 1}
                variant="contained"
                color="secondary"
                size="large"
              >
                {cat.qtestock <= 1 ? "OUT OF STOCK" : "Add to cart"}
              </Button>
            </CardActions>
          </Card>
        ))}
      </article>
    </section>
  );
};

export default ListCategorieCard;
