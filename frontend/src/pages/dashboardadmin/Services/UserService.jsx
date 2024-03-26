import Api from "../axios/Api";

const ART_API ='users'


const FetchUsers=async()=>{
    const token=localStorage.CC_Token
   
    return await Api.get(ART_API,{
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer'+token
        },
    });
}

const FetchUserById=async(id)=>{
    return await Api.get(ART_API+'/'+id);
}

const deleteUser =async(id)=>{
    return await Api.delete(ART_API+'/'+id);
} 

const addUser=async(user)=> {
    return await Api.post(""+ART_API , user);
}

 const editUser=(user) =>{
    return Api.put(ART_API + '/' + user._id, user);
 }

export const ServUsers={
    FetchUsers,
    FetchUserById,
    deleteUser,
    addUser,
    editUser
}