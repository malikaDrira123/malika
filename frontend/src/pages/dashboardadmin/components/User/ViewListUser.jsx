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
import { deleteUser } from "../../redux/features/UserSlice";

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
const ViewListUser = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  return (
    <>
    <>
      <h1>Liste Users</h1>
      <Button color="success" startIcon={<AddCircleIcon />} variant="contained">
        {
          <Link
            to={"/user/insertUser"}
            style={{ textDecoration: "none", color: "white" }}
          >
            Ajouter
          </Link>
        }
      </Button>
      <TableContainer component={Paper} style={{ marginTop: "10px" }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="right">telephone</StyledTableCell>
              <StyledTableCell align="center">password</StyledTableCell>
              <StyledTableCell align="center">action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row) => (
              <StyledTableRow key={row._id}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="left">{row.email}</StyledTableCell>
                <StyledTableCell align="right">{row.telephone}</StyledTableCell>
                <StyledTableCell align="left">{row.password}</StyledTableCell>
                <StyledTableCell>
                  <IconButton>
                    {
                      <Link to={"/user/editUser"}>
                        <EditIcon color="secondary" />
                      </Link>
                    }
                  </IconButton>
                  <IconButton onClick={() => dispatch(deleteUser(row._id))}>
                    <DeleteIcon sx={{ color: pink[500] }} />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
    </>
  );
};

export default ViewListUser;
