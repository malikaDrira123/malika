import Users from "../models/users.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config()

export const register= async (req, res) =>{
    
    try{

        // Permet de vérifier qu'il y a au moins une majuscule, une minuscule, une chiffre et un caractére specifique
        const checkPwd = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$/
    const {username, email, password} = req.body;
    if(username.trim()=== ""
    ||email.trim()=== ""
    ||password.trim()=== ""){
        return res.status(400).json({message:"Veuillez remplir tous les champs "})
    }
    // Permet de savoir si l'utilisateur est déjà inscrit
    const verifEmail = await Users.findOne({email:req.body.email})

    if (verifEmail ){
        return res.status(400).json({message:"Cet email est déjà enregistré"})
    }
    // Verification du mot de passe respectant la regex
    if(!checkPwd.test(req.body.password)){
        return res.status(400).json({message:"Mot de passe incorrect"})
    }


    const newUser= new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        
    })
    
    // il va execute le hachage de mot de passe avant de sauvgarder en BDD
    // le hook pre sera execute 
  
    await newUser.save()
    res.status(200).json({message:"Votre compte a bien étè créé !"})
    }catch(error){
       
res.status(500).json({message: "La création de compte a échoué"})
    }
}

export const login = async(req, res) => {
    try{
        const {email, password} = req.body
        const user = await Users.findOne({"email":email})
if(!user){
    return res.status(404).json({message:"Aucun utilisateur trouvé avec cette adresse email"})

}
// Je vais comparer le mot de passe inséré dans la req.body.password avec celui stockeé dans le BDD
const isValidPwd = bcrypt.compareSync(password, user.password)
if(!isValidPwd)   {
    return res.status(401).json({message:"Mot de passe incorrecte"})
}
const jwtSecret = process.env.TOKEN_SECRET;

if (!jwtSecret) {
  console.error('JWT_SECRET is not set in the environment.');
  // Handle the error or throw an exception as needed.
}

// Je vais créer mon token, si le MDP est correcte
const token = jwt.sign({id:user._id}, process.env.TOKEN_SECRET,{expiresIn: process.env.JWT_EXPIRES_TOKEN })
res.status(200).json({
    id:user._id,
    name:user.name,
    role:user.role,
    token:token
})

}catch(error){
   
res.status(500).json({message:"Erreur lors connexion"})
    }
}
export const getUsers = async (req,res) => {
    try {
        const us = await Users.find(); 
        res.status(200).json(us);
    }
    catch (error) {
        res.status(404).json({message : error.message})
    }
}

export const createUser = async (req,res) => {
    const { name, telephone, email, password} = req.body ; 
    //  Check if name is defined and is a string
  const trimmedName = typeof name === 'string' ? name.trim() : '';
    const newUser = new Users({
        name: trimmedName,
        telephone: telephone,
        email: email,
        password: password,
    });
    try {
        await newUser.save(); 
        res.status(201).json(newUser);
    } catch (error) {
        res.status(409).json({message: error.message})
    }
} ;



  const generateAccessToken = (user) => {
    return jwt.sign({ user}, process.env.TOKEN_SECRET, {
      expiresIn: "5000s",
    });
  };
  export const getuserBYEmail = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Users.find({ email, password });
    //   la vérification user.length === 0 est utilisée pour déterminer si l'utilisateur n'existe pas.
    // c'est le meme de merttre user =="" 
    if (!user.length) {
        res.status(401).send("utilisateur non existant");
        return;
      }
      const accessToken = generateAccessToken(user);
      res.status(200).json({
        accessToken,
      });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
  

export const getUserByID = async (req, res) => {
try {
    const us = await Users.findById(req.params.id);
    res.status(201).json(us);
} catch (error) {
    res.status(404).json({ message: error.message });
}
}

export const updateUser= async (req, res) => {
    const { id } = req.params;
    const { name, telephone,role, email} = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) 
    return res.status(404).send(`pas d'utilisateur avec un id: ${id}`);
const us = { 
    name: name.trim(),
    telephone: telephone.trim(),
    role: role.trim(),
    email: email.trim(),
    _id: id };
await Users.findByIdAndUpdate(id, us);
res.json(us);
}

export const deleteUser = async (req, res) => {
const { id } = req.params;
if (!mongoose.Types.ObjectId.isValid(id)) 
return res.status(404).send(`pas d'utilisateur avec l'ID: ${id}`);
await Users.findByIdAndDelete(id);
res.json({ message: "Utilisateur effacée avec success." });
}

export const getCart = async (req, res) => {

    try {
        const us = await Users.findById(req.params.id);
        
        res.status(201).json(us.cartData);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updateCart= async (req, res) => {
    const { id } = req.params.id;
    const { item} = req.body;
   
   
  const user =   await Users.findById(req.params.id);
  const existingProductIndex = user.cartData.findIndex(product => product.nameProduct === item.reference);

  if (existingProductIndex !== -1) {
    // Si le produit existe déjà, mettre à jour la quantité
    user.cartData[existingProductIndex].Quantity += item.quantity;
    // Mettre à jour le total si nécessaire
    user.cartData[existingProductIndex].Total += item.prixVente * item.quantity;
  } else {
    // Si le produit n'existe pas, ajouter une nouvelle entrée dans le panier
    user.cartData.push({
      'nameProduct': item.reference,
      'Price': item.prixVente,
      'Quantity': item.quantity,
      'Total': item.prixVente * item.quantity
    });
  }

const response=  await Users.findByIdAndUpdate(req.params.id, user);
res.json(response);
}


