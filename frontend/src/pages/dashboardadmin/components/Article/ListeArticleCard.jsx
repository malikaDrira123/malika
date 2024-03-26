import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ArticleService } from "../../../Services/ArticleService";

const ListArticleCard = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    GetListArticles();
  }, []);

  const GetListArticles = async () => {
    ArticleService.fetchArticles().then((res) => {
      setArticles(res.data);
    });
  };

  return (
    <section className="container">
      <article
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "left" }}
      >
        {articles.map((art, ind) => {
          return (
            <Card sx={{ maxWidth: "auto", margin: 1 }} key={ind}>
              <CardMedia
                component="img"
                alt="green iguana"
                height="160"
                image={art.imageartpetitf}
              />

              <CardContent>
                <Typography gutterBottom variant="h5" component="section">
                  {art.reference}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Prix : {art.prixVente} €
                </Typography>
              </CardContent>

              <CardActions>
                <Button
                  disabled={art.qtestock <= 1}
                  variant="contained"
                  color="secondary"
                  size="large"
                >
                  {art.qtestock <= 1 ? "OUT OF STOCK" : "Add to cart"}
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </article>
    </section>
  );
};

export default ListArticleCard;
