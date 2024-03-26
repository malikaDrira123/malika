import  mongoose  from "mongoose";
import isEmail from "validator/lib/isEmail.js";
import bcrypt from "bcrypt";

const userSchema =new  mongoose.Schema(
    {
    //   login:{
    //     type:String,
    // unique: true,
    // lowercase:true,
    // required:true,
    // trim:true
    // },
    name : {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 55,
        unique: true,
        trim: true
    }, 
    telephone : { 
        type : Number,
        trim:true
       }, 
    email : { 
        type : String, 
        required: true,
        validate: [isEmail],
        lowercase: true,
        unique: true,
        trim: true
    }, 
    password : {
        type : String , 
        required : true ,
        trim:true
    },
    role:{
      type:String,
      enum:['admin','user'],
      default:"user",
      required:true
  },
  cartData:[{
    type:Object,
  }]
    },
    {
        timestamps: true,
});
// Hook qui sera executé avant la création de l'utilisateur
userSchema.pre("save", async function(next) {
  // Si le mot de passe n'a pas été modifier
  if(!this.isModified("password")){
return next();
  }
  try{
    // Hachage asynchrone du mot de passe
    const salt = await bcrypt.genSalt(10);
    
    this.password = await bcrypt.hash(this.password, salt);
    next();
  }catch(error){
    next(error)
  }
      });
  
  userSchema.statics.login = async function(email, password) {
   
    const user = await this.findOne({ email });
     
    if (user) {
       
       
          const auth = await bcrypt.compare(password, user.password);
          
          if (auth) {
            return user;
          }
          throw Error('incorrect password');
        }
        throw Error('incorrect email')
      };


const Users = mongoose.model('Users', userSchema);

export default Users ; 