import { useEffect } from 'react';


import { useDispatch} from 'react-redux';
import ViewListUser from '../../../dashboardadmin/components/User/ViewListUser';
import { getUsers } from '../../redux/features/UserSlice';

const ListeUser = () => {
    const dispatch=useDispatch();
   
    useEffect(() => {
    dispatch(getUsers());
    },[dispatch]);

  return (
    <ViewListUser/>
  );
}

export default ListeUser;
