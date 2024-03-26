import multer from "multer";
import path from "path";

const maxSize = 5242880 //Environ 5 MO

const storage = multer.diskStorage({
    destination: 'upload/images',
    filename: (req, file, cb) => {
      return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
  });  
 
  

const storageEngine = multer.diskStorage({
    destination : "upload/images",
filename:(req, file, cb)=>{
    //slipt enleve toute les espaces avant au milieu et enfin
    cb(null, `${Date.now()}-${(file.originalname.split(" ")).join("_")}`);
   
}
})
const upload = multer({
    storage: storageEngine,
    limits:{
        fileSize:maxSize
    },
    fileFilter:(req, file, cb)=>{
        checkFileType(file,cb)
    }

})
// Creating upload Endpoint for images
app.use('/images', express.static('upload/images'));

app.post("/upload", upload.single('product'), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`
  });
});


// // // 
// // @param{*} file
// // @param{*} cb
// // @returns
// // fonction qui retourne et qui va vérifier le type desfichiers autorisés
const checkFileType=(file, cb) => {
 // Autorisation des fichiers img
const fileTypes = /jpg|png|gif|jpeg|webp|svg/
// Verification des extentions de fichiers
 const extName = fileTypes.test(path.extname(file.originalname).toLowerCase())
 const mimeType = fileTypes.test(file.mimetype)

if(extName && mimeType){
    return cb(null, true)

}else{
    cb("Format de fichier non supporté")
}
}

export default upload