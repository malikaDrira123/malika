export const signUpErrors = (err) => {

    let errors = { name: "", email: "", password: "" };
  
    if (err.message.includes("name"))
      errors.name = "Name incorrect ou déjà pris";
  
    if (err.message.includes("email")) errors.email = "Email incorrect";
  
    if (err.message.includes("password"))
      errors.password = "Le mot de passe doit contenir au moins 6 caractères ";
  
    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("name"))
      errors.name = "Ce pseudo est déjà pris";
  
    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
      errors.email = "Cet email est déjà enregistré";
  
    return errors;
  };

  export const signInErrors = (err) => {
    let errors = { email: '', password: ''}
  
    if (err.message.includes("email")) 
      errors.email = "Email inconnu";
    
    if (err.message.includes('password'))
      errors.password = "Le mot de passe ne correspond pas"
  
    return errors;
  }