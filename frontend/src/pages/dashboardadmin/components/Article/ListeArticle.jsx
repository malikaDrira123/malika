import { useEffect } from 'react';
import { useDispatch} from 'react-redux';
import ListeArticleT from '../../components/Article/ListArticlesT';
import { getArticles } from '../../redux/features/articleSlice';






const ListeArticle = () => {
    
    const dispatch=useDispatch();
   
    useEffect(() => {
    dispatch(getArticles());
    },[dispatch]);

  return (
    
 <ListeArticleT/>
    
   
  );
}

export default ListeArticle;
