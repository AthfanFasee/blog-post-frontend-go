import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useDispatch } from 'react-redux';
import {updatePageParam} from '../../../features/Params';


export default function Page({pageCount}) {
  const dispatch = useDispatch();

  const handleChange = (event, value) => {
    dispatch(updatePageParam(value))
  };

  
  return (
        <div>
        <Stack spacing={5}>   
            <Pagination  count={pageCount} variant="outlined" shape="rounded"   onChange={handleChange}/>  
        </Stack>
        </div>
    
  );
}