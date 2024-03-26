import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ArticleService } from "../../Services/ArticleService";

export const createArticle = createAsyncThunk(
  //type d'action:objet(article)et action(create)

  "article/createArticle",
  //     async(article)=>{
  //         return await ArticleService.addArticle(article);
  //     }
  // )
  async (article, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await ArticleService.addArticle(article);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getArticles = createAsyncThunk(
  "article/getArticles",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await ArticleService.fetchArticles();
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateArticle = createAsyncThunk(
  "article/updateArticle",
  async (art, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await ArticleService.editArticle(art);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteArticle = createAsyncThunk(
  "article/deleteArticle",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await ArticleService.deleteArticle(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const findArticleByID = createAsyncThunk(
  "article/findArticleByID",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await ArticleService.fetchArticlesByID(id);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const articleSlice = createSlice({
  name: "article",
  initialState: {
    articles: [],
    article: {},
    isLoading: false,
    status: null,
  },
  reducers: {},

  extraReducers: (builder) => {

    builder
    //get articles

      .addCase(getArticles.fulfilled, (state, action) => {
        state.status = null;
        state.articles = action.payload;
        state.isLoading=true;
      })
      .addCase(getArticles.pending, (state, action) => {
        state.isLoading = true;
        state.status = null;
      })

      .addCase(getArticles.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload;
        state.isLoading=false;
        
      })
//insertion article

.addCase(createArticle.pending, (state, action) => {
    state.isLoading=true;
    state.status=null;
    
  })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.status = null;
        state.articles.push(action.payload);
        state.isLoading=false;
      })

      .addCase(createArticle.rejected, (state, action) => {
        state.isLoading=false;
        state.status=action.payload;
      })
      //Modification article

      .addCase(updateArticle.fulfilled, (state, action) => {
        const index = state.articles.findIndex(
          article => article._id === action.payload._id
        );
        state[index] = {
          ...state[index],
          ...action.payload,
        };
      })
//Delete article
.addCase(deleteArticle.pending, (state, action) => {
    state.isLoading=true;
    state.status=null;
    
  })
      .addCase(deleteArticle.fulfilled, (state, action) => {
    //     let index = state.articles.findIndex(
    //       ({ id }) => id === action.payload._id
    //     );
    //     state.articles.splice(index, 1);
    //   })
    state.isLoading=false;
    state.status=null;
    state.articles=state.articles.filter((item)=> item._id!==action.payload)
      })

//Fectch article
      .addCase(findArticleByID.fulfilled, (state, action) => {
        return [...action.payload];
      });
  },
});

export default articleSlice.reducer;
