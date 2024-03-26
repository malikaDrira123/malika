import Users from "../models/users.js";
import jwt  from "jsonwebtoken";
import { signInErrors, signUpErrors } from "../outils/erreur.js";

const maxAge = 3 * 24 * 60 * 60 * 1000; // validation du token 3 jours en millisecondes
const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {expiresIn: maxAge})
} ; 

// createToken est une fonction qui prend l'ID d'un utilisateur et crée un token JWT en utilisant la méthode sign de jsonwebtoken. 
// Ce token contient l'ID de l'utilisateur et expire après la durée spécifiée par maxAge
export const signUp = async(req, res) => {
    const { name, telephone, email, password, role} = req.body ; 
    const newUser = new Users ({name:name, telephone:telephone, email: email, password : password, role:role})
    try {
       
        await newUser.save(); 
        res.status(201).json(newUser);
    } catch (error) {

        const err = signUpErrors(error);
        res.status(409).json({err})
    }
}

// La fonction signIn gère le processus d'authentification de l'utilisateur.
// Elle extrait les informations d'identification (email, password) du corps de la requête.
// La méthode Users.login est utilisée pour vérifier les informations d'identification et récupérer l'utilisateur correspondant.
// Si la vérification réussit, un token est créé à l'aide de la fonction createToken, et ce token est inclus dans un cookie (jwt) envoyé au client.
// La réponse inclut également l'ID de l'utilisateur.
export const signIn = async(req,res) => {
    const { name, telephone, email, password} = req.body ; 
    try {
        const user = await Users.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly : true, maxAge })
        res.status(200).json ({user : user._id, role: user.role, name: user.name, token: token});
    } catch (error) {
        const err = signInErrors(error);
        res.status(400).json(err);
    }
}
// La fonction logout gère la déconnexion de l'utilisateur.
// Elle supprime le cookie JWT en fixant sa valeur à une chaîne vide et sa durée de validité à 1 milliseconde.
// Ensuite, elle redirige l'utilisateur vers la page d'accueil ('/').

export const logout = async(req,res) => {
    res.cookie('jwt', '' , {maxAge : 1});
    res.redirect('/');
}
