import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import './SortingButton.css';



export default function SortButton({setSort}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  }
  const Newest = () => {
    setAnchorEl(null);
    setSort('-createdAt');
  };
  const Oldest = () => {
    setAnchorEl(null);
    setSort('createdAt');
  };
  const MostLiked = () => {
    setAnchorEl(null);
    setSort('likesCount');
  };

  return (
    <div className="SortButtonContainer">
      <Button
      sx={{ fontSize: '15px', 
            color: '#020202',
            textTransform: 'none',
            fontFamily : 'Baloo Bhaijaan 2 cursive',
            border : '1px solid #87BCF2',
            borderRadius: '5px',
            backgroundColor: '#87BCF2',      
          }}
        className="Button"
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Sort By
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem className="MenuItem"onClick={Newest}>Newest First</MenuItem>
        <MenuItem className="MenuItem" onClick={Oldest}>Oldest First</MenuItem>
        <MenuItem className="MenuItem" onClick={MostLiked}>Most Liked</MenuItem>
      </Menu>
    </div>
  );
}