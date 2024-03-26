import  { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import ViewListcategories from './ViewListcategories.jsx';
import { getCategories } from '../../redux/features/categorieSlice.jsx';


 const Listcategories = () => {
    const dispatch =useDispatch();
    useEffect(()=>{
        dispatch(getCategories());

    }, [dispatch]);
  return (
    <ViewListcategories/>
  )
}
export default  Listcategories