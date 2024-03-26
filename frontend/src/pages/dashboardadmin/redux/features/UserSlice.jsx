import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ServUsers } from '../../Services/UserService';



export const createUser =createAsyncThunk(
    "user/create",
    async(user)=>{
        return await ServUsers.addUser(user);
    }
)

export const getUsers =createAsyncThunk(
    "user/getusers",
    async()=>{
        const res=await ServUsers.FetchUsers();
        return res.data; 
        
    }
   
)

export const updateUser =createAsyncThunk(
    "user/updateuser",
    async(user)=>{
        const res=await ServUsers.editUser(user);
        return res.data; 
    }
)

export const deleteUser =createAsyncThunk(
    "user/deleteuser",
    async({id})=>{
    
        await ServUsers.deleteUser(id);
        return {id}; 
    }
)


export const findUserByID =createAsyncThunk(
    "user/FindByID",
    async({id})=>{
        const res=await ServUsers.FetchUserByIdById(id);
        return res.data; 
    }
)

 export const  userSlice= createSlice(
    {
        name:'user',
        initialState:{
            users : [],
            user :{},
            status : null,
        },
        reducers :{},
        
        extraReducers: (builder)=>{
         builder 
         .addCase(getUsers.fulfilled,(state,action)=>{
             state.status="success";
             state.users=action.payload;
         })   
         .addCase(createUser.fulfilled,(state,action)=>{
            state.status="success";
            state.users.push(action.payload);
        })  
        .addCase(updateUser.fulfilled,(state,action)=>{
            const index = state.users.findIndex(user =>
                user._id === action.payload._id);
                state[index] = {
                ...state[index],
                ...action.payload,
                }; 
        })  

        .addCase(deleteUser.fulfilled, (state, action) => {
            let index = state.users.findIndex(({ id }) => id
            === action.payload._id);
            state.users.splice(index, 1);
            })

            .addCase(findUserByID.fulfilled, (state, action) =>
            {
            return [...action.payload];
            })
        }

    }
)

export default userSlice.reducer;


