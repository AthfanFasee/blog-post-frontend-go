import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import './ProfileButton.css';
import {useSelector, useDispatch} from 'react-redux';
import {updateUserIDParam, updatePageParam} from '../../../features/Params';
import {useLazyGetPostsQuery} from '../../../services/PostsApi';

export default function ProfileButton() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  
  const dispatch = useDispatch();

  const UserIDParam = useSelector((state) => state.Params.value.userId);
  const page = useSelector((state) => state.Params.value.page);
  const sort = useSelector((state) => state.Params.value.sort);

  const [triggerGetPostsQuery] = useLazyGetPostsQuery();

  const userID = localStorage.getItem('userID');
  const userName = localStorage.getItem('userName');
  
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const myPostsButtonOnClick = () => {
    localStorage.setItem("OldPageValue", page);
    dispatch(updateUserIDParam(`id=${userID}`));
    dispatch(updatePageParam(1))
    triggerGetPostsQuery({page: 1, sort, UserIDParam: `id=${userID}`}, false)
  }
  const showAllPostsButtonOnClick = () => {
    dispatch(updateUserIDParam(""))
    const oldPageValue = Number(localStorage.getItem("OldPageValue"))
    dispatch(updatePageParam(oldPageValue))
    triggerGetPostsQuery({page: oldPageValue, sort, UserIDParam: ""}, false)
    localStorage.removeItem("OldPageValue")
  }

  const navigate = useNavigate()

  //setting up logout function
    const signOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userID');
        navigate('/');
        window.location.reload();
    }

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="My Profile">
          <IconButton
            data-testid="IconButton"
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar  sx={{ width: 50, height: 50 }}>{userName.charAt(0)}</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >

        {(!UserIDParam || UserIDParam === " ") && <MenuItem className="Menu" onClick={myPostsButtonOnClick}>
          <LocalPostOfficeIcon className="PostsIcon" /> My Posts
        </MenuItem>}
        {(UserIDParam && UserIDParam !== " ")&&
        <MenuItem className="Menu" onClick={showAllPostsButtonOnClick}>
        <LocalPostOfficeIcon className="PostsIcon" /> Show All Posts
        </MenuItem>
        }
        
        <MenuItem className="Menu" onClick={signOut}>
          <ListItemIcon>
            <Logout fontSize="small"/>
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}