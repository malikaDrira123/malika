import mongoose  from "mongoose";
import dotenv from "dotenv"; 

dotenv.config();

// Désactiver strictQuery
mongoose.set('strictQuery', false);
const connectBD=()=>{
mongoose
.connect(`${process.env.DATABASECLOUD}`, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    

  })

   .then(() => {
    console.log("Connexion à la base de données réussie");
   })
   .catch(err => {
    console.log('Impossible de se connecter à la base de données', err);
    process.exit();
   });
}
export default connectBD