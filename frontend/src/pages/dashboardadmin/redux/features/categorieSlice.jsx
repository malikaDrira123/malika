

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CategorieService } from '../../Services/CategorieService';

export const createCategorie = createAsyncThunk(
  "categorie/create",
  async (categorie) => {
    return await CategorieService.addCategorie(categorie);
  }
);

export const getCategories = createAsyncThunk(
  "categorie/getCategories",
  async () => {
    const res = await CategorieService.fetchCategories();
    return res.data;
  }
);

export const updateCategorie = createAsyncThunk(
  "categorie/update",
  async (data) => {
    return await CategorieService.updateCategorie(data);
  }
);

export const deleteCategorie = createAsyncThunk(
  "categorie/delete",
  async (id) => {
    await CategorieService.deleteCategorie(id);
    return { id };
  }
);

export const finCategorieById = createAsyncThunk(
  "categorie/findById",
  async ({ id }) => {
    const res = await CategorieService.fetchCategoriesByID(id);
    return res.data;
  }
);

export const categorieSlice = createSlice({
  name: 'categorie',
  initialState: {
    categories: [],
    categorie: {},
    status: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.fulfilled, (state, action) => {
        state.status = "success";
        state.categories = action.payload;
      })
      .addCase(createCategorie.fulfilled, (state, action) => {
        state.status = "success";
        state.categories.push(action.payload); // Utilisez push au lieu de up
      })
      .addCase(updateCategorie.fulfilled, (state, action) => {
        state.status = "success";
        state.categories = state.categories.map((cat) =>
          cat._id === action.payload._id ? action.payload : cat
        );
      })
      .addCase(deleteCategorie.fulfilled, (state, action) => {
        state.status = "success";
        state.categories = state.categories.filter(
          (cat) => cat._id !== action.payload.id
        );
      });
  },
});

export default categorieSlice.reducer;

