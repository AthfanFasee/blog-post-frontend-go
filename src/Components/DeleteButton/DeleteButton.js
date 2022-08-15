import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { useDeletePostMutation } from '../../services/PostsApi';

function DeleteButton({post}) {

    //for delete confirmation
    const [open, setOpen] = useState(false);



    //Deleting the post 
    const [deletePost] = useDeletePostMutation()
   
    const handleClickOpen = () => {
        setOpen(true);

      };
    
      const handleClose = () => {
        setOpen(false);
      };

      const confirmDelete = async () => {
        await deletePost(post._id)
        setOpen(false);   
      }

      
      
    return (
        <div className="deletediv">

            {/* Delete Confirmation */} 
             <DeleteIcon variant="outlined" data-testid="deleteIcon" onClick={handleClickOpen}></DeleteIcon>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">

                    <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to delete this post?"}
                    </DialogTitle>

                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                          Once Deleted, This Post cannot be RESTORED!!!
                      </DialogContentText>
                    </DialogContent>

                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button onClick={confirmDelete} autoFocus>Delete</Button>
                    </DialogActions>

                </Dialog>                      
        </div>
    )
}

export default DeleteButton;
