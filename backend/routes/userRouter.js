import express from "express";
import { getUsers, getUserByID, updateUser, deleteUser, createUser ,login, register, updateCart, getCart} from "../controllers/usersControlles.js";


const router = express.Router();

router.post('/signup', register);
router.post('/signin', login);
router.post('/addToCart/:id', updateCart);
router.get('/getCart/:id', getCart);
// router.get('/logout', logout);

//router.get('/',createUser);

router.get('/', getUsers);
router.get('/:id', getUserByID);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;