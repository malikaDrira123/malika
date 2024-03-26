import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import { CardMedia, CardContent } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});
const Viewarticle = () => {
  const { articles } = useSelector((state) => state.articles);

  return (
    <section className="container" style={{ marginTop: "50px" }}>
      <article
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {articles.map((row) => (
          <Card sx={{ maxWidth: "auto", margin: "auto" }}>
            <CardMedia
              component="img"
              alt=""
              height="160"
              image={`/${row.imageartpetitf}`}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="section">
                {row.reference}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                component="article"
              >
                {row.prixVente}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                disabled={row.qtestock <= 1}
                variant="contained"
                color="secondary"
                size="large"
                onClick={() => {}}
              >
                {row.qtestock <= 1 ? "OUT OF SOLD" : "Add to cart"}
              </Button>
            </CardActions>
          </Card>
        ))}
      </article>
    </section>
  );
};

export default Viewarticle;
