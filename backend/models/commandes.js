import mongoose from "mongoose";
import Users from "./users.js";


const commandesSchema = new mongoose.Schema({
    refcommande: {type : String , required : true , unique : true}, 
    dateAchat : {type : Date, required : true}, 
    mt_total : {type : Number, required : true},
    paye : {type : Boolean, required : true},
    UsersID : {type : mongoose.Schema.Types.ObjectId, ref: "Users"}
},
{
  timestamps: true
});
    

commandesSchema.pre('remove', async function(req,res,next) { 
  // Utiliser une vérification de type avant d'appliquer trim
  if (typeof this.refcommande === 'string') {
    this.refcommande = this.refcommande.trim();
  }
 // Date n'a pas de méthode trim() et doit être vérifié pour sa validité
 if (this.dateAchat instanceof Date && !isNaN(this.dateAchat)) {
  this.dateAchat = new Date(this.dateAchat); // Vous pouvez effectuer un traitement spécial ici si nécessaire
}

// Number n'a pas de méthode trim() et doit être vérifié pour sa validité
if (typeof this.mt_total === 'number') {
   // Exemple : arrondir mt_total à deux décimales
  this.mt_total = Math.round(this.mt_total * 100) / 100;
}

// Boolean n'a pas de méthode trim() et doit être vérifié pour sa validité
if (typeof this.paye === 'boolean') {
   // Par exemple, vous pouvez inverser la valeur de paye
   this.paye = !this.paye;
}
 

 
  
  Users.deleteMany({ commandes: { $in: [this._id] } }, function(err) {})
        next();
     })

const Commandes = mongoose.model('Commandes', commandesSchema); 

export default Commandes ;