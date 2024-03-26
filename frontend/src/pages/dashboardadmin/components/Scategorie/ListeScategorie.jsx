import { useEffect} from 'react';
import { useDispatch} from 'react-redux';

 import { getScategorie } from'../../redux/features/ScategorieSlice'
import ViewListSousCat from './ViewListSousCat';



const ListeScategorie = () => {
  const dispatch=useDispatch();
   
  useEffect(() => {
  dispatch(getScategorie());
  },[dispatch]);
  return (
    <>
       <  ViewListSousCat/>
    </>
  );
}

export default ListeScategorie;
