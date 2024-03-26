import  mongoose  from "mongoose";
import Categorie from "./categorie.js";

const scategorieSchema =new  mongoose.Schema({
    nomscategorie: {type : String , required : true , unique : true}, 
    imagescategorie : {type : String, required : false}, 
    categorieID : {type : mongoose.Schema.Types.ObjectId, ref: Categorie}
},
{
  timestamps: true
});
    

scategorieSchema.pre('remove', async function(req,res,next) { 
    Categorie.deleteMany({ Scategorie: { $in: [this._id] } }, function(err) {})
        next();
     })
     
const Scategorie = mongoose.model('Scategorie', scategorieSchema); 

export default Scategorie 