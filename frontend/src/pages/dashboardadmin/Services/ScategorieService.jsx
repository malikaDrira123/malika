import Api from "../axios/Api";

const Scategorie_Api = "/scategories" 

const fetchScategories = async() => {
    return await Api.get(Scategorie_Api);
}

const fetchScategoriesByID = async(scategorieID) => {
    return await Api.get(Scategorie_Api + '/' + scategorieID);
}


const deleteScategorie = async (scategorieID) => {
  
  return await Api.delete(Scategorie_Api + '/' + scategorieID);
}

const addScategorie = async (scategorie) => {
    try {
      const response = await Api.post('/scategories', scategorie);
      return response.data;
    } catch (error) {
      console.error('Error adding scategory:', error);
      throw error; // Rethrow the error to propagate it to the component
    }
  };

const editScategorie = async (scategorie) => {
    try {
      const response = await Api.put(Scategorie_Api + '/' + scategorie._id, scategorie);
      return response.data;
    } catch (error) {
      console.error('Error editing scategory:', error);
      throw error; // Rethrow the error to propagate it to the component
    }
  };
  

const fetchSCategorieByCAT = async(categorieID) => {
    if(categorieID)
    return Api.get(`${Scategorie_Api}/cat/${categorieID}`);
}

export const ScategorieService = {
    fetchScategories,
    fetchScategoriesByID,
    deleteScategorie,
    addScategorie,
    editScategorie,
    fetchSCategorieByCAT
    }
