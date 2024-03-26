import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { IconButton, Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { pink } from "@mui/material/colors";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import {
  deleteCategorie,
  getCategories,
} from "../../redux/features/categorieSlice";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ViewListcategories = () => {
  // ajouter dispatch
  //récuperer les donner
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    // Charger les données ici
    dispatch(getCategories()); // Assurez-vous que fetchCategories est importé
  }, [dispatch]);

 

  return (
    <>
      <h1>View List des categories</h1>

      <Button color="success" startIcon={<AddCircleIcon />} variant="contained">
        {
          <Link
            to={"/cat/insertcat/"}
            style={{ textDecoration: "none", color: "white" }}
          >
            Ajouter
          </Link>
        }
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>nom</StyledTableCell>
              <StyledTableCell align="right">image</StyledTableCell>
              <StyledTableCell>action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((row) => (
              <StyledTableRow key={row._id}>
                <StyledTableCell component="th" scope="row">
                  {row.nomcategorie}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <img src={`/${row.imagecategorie}`} alt="" width="100" />
                </StyledTableCell>
                <StyledTableCell>
                  <IconButton>
                    {
                      <Link to={`/cat/editcat/${row._id}`}>
                        <EditIcon color="secondary" />
                      </Link>
                    }
                  </IconButton>
                  <IconButton
                    onClick={() => dispatch(deleteCategorie(row._id))}
                  >
                    <DeleteIcon sx={{ color: pink[500] }} />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default ViewListcategories;
