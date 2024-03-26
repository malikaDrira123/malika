import Api from "../axios/Api";

const Categorie_Api = "/Categories" 

const fetchCategories = async() => {
    return await Api.get(Categorie_Api);
}

const fetchCategoriesByID = async(categorieID) => {
    return await Api.get(Categorie_Api + '/' + categorieID);
}

const deleteCategorie = async(categorieID) => {
    return await Api.delete(Categorie_Api + '/' + categorieID);
}

// const addCategorie = async(categorie) => {
//     return await Api.post("" + Categorie_Api + categorie);
// }
const addCategorie = async (categorie) => {
    try {
      const response = await Api.post('/categories', categorie);
      return response.data;
    } catch (error) {
      console.error('Error adding category:', error);
      throw error; // Rethrow the error to propagate it to the component
    }
  };
  
const editCategorie=(categorie) =>{ 
    return Api.put(Categorie_Api + '/' + categorie._id, categorie);
    }

export const CategorieService = {
    fetchCategories,
    fetchCategoriesByID,
    deleteCategorie,
    addCategorie,
    editCategorie,
    }
