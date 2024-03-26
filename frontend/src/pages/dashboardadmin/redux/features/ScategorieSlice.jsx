import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ScategorieService } from '../../Services/ScategorieService';

export const createScategorie =createAsyncThunk(
    "Scategorie/create",
    async(Scat)=>{
        return await ScategorieService.addScategorie(Scat);
    }
)

export const getScategorie =createAsyncThunk(
    "Scategorie/getScategorie",
    async()=>{
        const res=await ScategorieService.fetchScategories();
        return res.data; 
        
    }
   
)

export const updateScategorie =createAsyncThunk(
    "Scategorie/updateScategorie",
    async(data)=>{
        const res=await ScategorieService.updateSCategorie(data);
        
    }
)

export const deleteScategorie =createAsyncThunk(
    "Scategorie/deleteScategorie",
    async({id})=>{
        await ScategorieService.deleteScategorie(id);
        return {id}; 
    }
)


export const FindScategorieByID =createAsyncThunk(
    "Scategorie/FindByID",
    async({id})=>{
        const res=await ScategorieService.fetchScategoriesByID(id);
        return res.data; 
    }
)

 export const  ScategorieSlice= createSlice(
    {
        name:'scategorie',
        initialState:{
            scategories : [],
            scategorie :{},
            status : null,
        },
        reducers :{},
        
        extraReducers: (builder)=>{
         builder 
         .addCase(getScategorie.fulfilled,(state,action)=>{
            state.status="success";
            state.scategories=action.payload;
        })   
        .addCase(createScategorie.fulfilled,(state,action)=>{
           state.status="success";
           state.scategories.push(action.payload);
      })  
    //    .addCase(updateScategorie.fulfilled,(state,action)=>{
    //        const index = state.scategories.findIndex(scategorie =>
    //            scategorie._id === action.payload._id);
    //            state[index] = {
    //            ...state[index],
    //            ...action.payload,
    //            }; 
    //    })  

    //    .addCase(deleteScategorie.fulfilled, (state, action) => {
    //        let index = state.scategories.findIndex(({ id }) => id
    //        === action.payload._id);
    //        state.scategories.splice(index, 1);
    //        })
    .addCase(updateScategorie.fulfilled, (state, action) => {
        const updatedScategorie = action.payload;
        const index = state.scategories.findIndex(scategorie => scategorie._id === updatedScategorie._id);
        if (index !== -1) {
            state.scategories[index] = updatedScategorie;
        }
    })
    .addCase(deleteScategorie.fulfilled, (state, action) => {
        const deletedId = action.payload.id;
        state.scategories = state.scategories.filter(scategorie => scategorie._id !== deletedId);
    })

           .addCase(FindScategorieByID.fulfilled, (state, action) =>
           {
           return [...action.payload];
           })  
        }

    }
)

export default ScategorieSlice.reducer;