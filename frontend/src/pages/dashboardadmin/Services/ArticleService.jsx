import Api from "../axios/Api";

const Article_Api = "/Articles" 

const fetchArticles = async() => {
    const token =JSON.parse( localStorage.user).token;
    
    return await Api.get(Article_Api, {
        headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token
        },
        });
}

const fetchArticlesByID = async(articleID) => {
    return await Api.get(Article_Api + '/' + articleID);
}

const deleteArticle = async(articleID) => {
    return await Api.delete(Article_Api + '/' + articleID);
}

const addArticle = async(article) => {
    return await Api.post(Article_Api, article);
}
// const editArticle= async(article) =>{ 
//     return await Api.put(Article_Api + '/' + article._id, article);
//     }
const editArticle = async (article) => {
    try {
        const response = await Api.put(Article_Api + '/' + article._id, article);
        return response.data; // or whatever data structure your API returns on success
    } catch (error) {
        console.error("Error editing article:", error);
        throw error; // rethrow the error to be caught by the calling function
    }
}

    const fetchArticleByCat=async(catId)=> {
        return await Api.get(Article_Api + '/affparcat/' + catId);
        } 
export const ArticleService = {
        fetchArticles,
        fetchArticlesByID,
        deleteArticle,
        addArticle,
        editArticle,
        fetchArticleByCat
    }