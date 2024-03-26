import Api from '../axios/Api';

const USER_API="/users"

 const register=async(user)=> { 
   
    return await Api.post(USER_API,user);

    }    

const login=async(user)=> { 
        return await Api.post(USER_API+"/loginutilisateur/", user);
        
    }     

 export const AuthService = {
    
    register,
    login
}