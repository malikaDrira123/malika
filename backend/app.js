import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import categorieRouter from "./routes/categorieRouter.js";
import scategorieRouter from "./routes/scategorieRouter.js";
import articleRouter from "./routes/articleRouter.js";
import commandeRouter from "./routes/commandeRoute.js";
import userRouter from "./routes/userRouter.js";
import { checkUser, requireAuth } from "./middelware/auth.middelware.js";
import connectDB from "./config/database.js";
import multer from "multer";
import { getArticlesByCategory } from "./controllers/articlesControlles.js";
import nodemailer from "nodemailer";
import { check, validationResult } from "express-validator";
import dotenv from "dotenv";
import Article from "./models/article.js";
import Users from "./models/users.js";
import Contact from "./models/contact.js";

// Configuration de l'application Express
const app = express();

app.use(express.json());
//on utilise cors pour sécurisé votre site
app.use(
  cors({
    origin: "http://localhost:3000",
    // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true })); //
app.use(express.json());
app.use(cookieParser());

dotenv.config();
// Connexion à la base de données
connectDB();

app.use("/api/categories", categorieRouter);
app.use("/api/scategories", scategorieRouter);
app.use("/api/articles", articleRouter);
app.use("/api/users", userRouter);
app.use("/api/commandes", commandeRouter);

// Servir les fichiers statiques dans le répertoire 'assets'
app.use("/assets", express.static("assets"));

app.get("/", (req, res) => {
  res.render("NewsLatter", { errors: "" });
});
// Route pour la souscription à la newsletter
app.post("/subscribe", async (req, res) => {
  const { email } = req.body;
  // Enregistrez l'e-mail dans votre base de données ou envoyez-le à un service de newsletter, etc.
  // Vous pouvez également envoyer un e-mail de confirmation à l'utilisateur ici
  try {
    // Enregistrez l'e-mail dans votre base de données ou envoyez-le à un service de newsletter
    
    const message = `New subscriber: ${email}`;
    // Répondez à la demande avec un statut 200 si tout s'est bien passé
    res.status(200).json({ message: "Subscription successful", subscriber: email });
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    // Répondez avec un statut 500 en cas d'erreur
    res.status(500).json({ message: "Failed to subscribe to newsletter" });
  }
});
app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});

app.use(express.static("public"));

const storage = multer.diskStorage({
  destination: "upload/images",
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });
// Creating upload Endpoint for images
app.use("/images", express.static("upload/images"));
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${process.env.PORT}/images/${req.file.filename}`,
  });
});


// Création d'un transporteur de courrier électronique avec nodemailer
const transporter = nodemailer.createTransport({
  service: "Gmail",// Service de messagerie utilisé (Gmail dans cet exemple)
  auth: {
    user: process.env.EMAIL_USER,// Nom d'utilisateur du compte de messagerie
    pass: process.env.EMAIL_PASS,// Mot de passe du compte de messagerie
  },
  tls: {
    rejectUnauthorized: false,// Option pour autoriser les certificats TLS auto-signés (souvent utilisés dans les environnements de développement)
  },
});
// Route POST pour envoyer un email
app.post(
  "/send",
  [
    // Validation des champs de formulaire avec express-validator
    check("firstName").notEmpty().withMessage("firstName is required"),
    check("lastName").notEmpty().withMessage("lastName is required"),
    check("company").notEmpty().withMessage("company is required"),
    check("email").isEmail().withMessage("Invalid Email Address"),
    check("subject").notEmpty().withMessage("Subject is required"),
    check("message").notEmpty().withMessage("Message is required"),
  ],
  async (req, res) => {
    try {
      // Vérification des erreurs de validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
 // Extraction des données du formulaire de contact
      const { lastName, firstName, company, email, subject, message } =
        req.body;
 // Création d'un nouvel objet Contact avec les données du formulaire
      const newContact = new Contact({
        lastName,
        firstName,
        company,
        email,
        subject,
        message,
      });
      // Enregistrement du nouvel objet Contact dans la base de données
      await newContact.save();
// Options de l'email à envoyer
      const mailOptions = {
        from: email,// Adresse email de l'expéditeur
        to: "malika.drira78170@gmail.com",// Adresse email du destinataire
        subject: req.body.subject,// Sujet de l'email
        text: `You have received a new message :\n\nNom: ${firstName} ${lastName}\nEntreprise: ${company}\nEmail: ${email}\nMessage: ${message}`,
      };
 // Envoi de l'email via le transporteur nodemailer
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          // Gestion des erreurs lors de l'envoi de l'email
          console.error("Error sending message:", error);
          res.status(500).json({ status: "fail" });
        } else {
          // Si l'email est envoyé avec succès
          res.status(200).json({ status: "success" });
        }
      });
    } catch (error) {
         // Gestion des erreurs générales
      console.error("Error during request processing:", error);
      res.status(500).json({ status: "fail" });
    }
  }
);
// Ajoutez la route getArticlesByCategory
app.get("/category/:categoryId", getArticlesByCategory);

// Endpoint pour récupérer les nouvelles collections
app.get("/newCollection", async (req, res) => {
  try {
    // Récupérer tous les articles depuis la base de données
    const articles = await Article.find({});

    // Trier les articles pour obtenir les huit derniers
    const newCollection = articles.slice(1).slice(-8);

    // Envoyer les nouvelles collections en tant que réponse
    res.json(newCollection);
  } catch (error) {
    // Gérer les erreurs
    console.error("Error fetching new collections:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// // creating endpoint for data adding product in cartData

app.post("/addToCart", checkUser, async (req, res) => {
  try {
    

    let userData = await Users.findOne({ _id: req.user.id });
    
    userData.cartData.push(eq.body.itemId); //  [req.body.itemId] += 1;
    
    await Users.findOneAndUpdate(
      { _id: req.user.id },
      { cartData: userData.cartData }
    );

    res.send("added");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// creating endpoint for data removing product from cartData
app.delete(
  "/removeFromCart/user/:idUser/product/:idProduct",
  checkUser,
  async (req, res) => {
    try {
      const userId = req.params.idUser;
      const productId = req.params.idProduct;

      // Find the user by ID
      let userData = await Users.findOne({ _id: userId });

      // Check if user exists
      if (!userData) {
        return res.status(404).json({ message: "User not found" });
      }

      // Remove the product from the user's cart data
      userData.cartData = userData.cartData.filter(
        (item) => item.nameProduct !== productId
      );

      // Save the updated user data
      await userData.save();

      res.json(userData.cartData);
    } catch (error) {
      console.error("Error removing product from cart:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

app.listen(process.env.PORT || 9000, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
