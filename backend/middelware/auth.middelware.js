import Users from "../models/users.js";
import  jwt  from "jsonwebtoken";




// Ce middleware est conçu pour être utilisé dans les routes qui nécessitent une authentification.
export const auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  
  // le bloc try-catch pour gérer les erreurs de manière plus propre et renvoyer des messages d'erreur explicites
  try {
    
    // Vérifier si le token est présent dans l'en-tête
    if (!authHeader) {
      throw new Error("Token manquant");
    }

    const token = authHeader.split(" ")[1];

    // Vérifier si le token existe
    if (!token) {
      // L'utilisation de throw new Error rend plus explicite la raison de l'erreur, facilitant ainsi la maintenance du code
      throw new Error("Token manquant");
    }

    // Vérifier la validité du token

    const user = jwt.verify(token, process.env.TOKEN_SECRET);

    // Ajouter l'utilisateur au corps de la requête
    req.user = user;
    next();
  } catch (error) {
    console.error("Erreur d'authentification :", error.message);
   
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expiré" });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Token invalide" });
    }

    return res.status(401).json({ error: "Authentification échouée" });
  }
};

// Ce middleware est utilisé pour vérifier la présence d'un token dans les cookies de la requête.
// S'il y a un token, il est vérifié en utilisant jwt.verify.
// S'il est valide, l'utilisateur correspondant à l'ID contenu dans le token est extrait de la base de données (s'il existe) et ajouté à res.locals.user.
// S'il y a une erreur lors de la vérification du token, l'utilisateur local est défini sur null et le cookie JWT est supprimé.

export const checkUser = (req,res,next) => {
    // Extraire le jeton JWT des cookies, des en-têtes ou d'autres sources
    const token = req.cookies.jwt ; 
    if (token) {
        jwt.verify(token,process.env.TOKEN_SECRET, async(err, decodedToken) => {
            if (err) {
                res.locals.user = null ; 
                res.clearCookie("jwt", {maxAge : 1});
                next();
            } else {
                let user = await Users.findById(decodedToken.id);
                res.locals.user = user ; 
                next();
            }
        });
    } else {
        res.locals.user = null ; 
        next();
    }
}; 


// C'est un middleware qui peut être utilisé pour les routes nécessitant une authentification obligatoire.
// Il vérifie la présence d'un token dans les cookies de la requête.
// S'il y a un token et qu'il est valide, le middleware passe à l'étape suivante (next()).
// Si le token est absent ou invalide, une réponse est renvoyée avec un statut 401 (Non autorisé) et un message "no token".

export const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
        if (err) {
          
          res.status(401).json({ error: 'Token invalide' });
        } else {
          
          next();
        }
      });
    } else {
      
      res.status(401).json({ error: 'Aucun token trouvé' });
    }
  };