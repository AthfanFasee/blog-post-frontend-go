import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import SendIcon from '@mui/icons-material/Send';
import './CommentInput.css';
import { IconButton } from '@mui/material';
import CommentPopOver from './CommentPopOver/CommentPopOver';


const ariaLabel = { 'aria-label': 'description' };

export default function CommentInput({addComment, postID, commentInput, setCommentInput}) {



  const token = localStorage.getItem('token');
  
  return (
    <div className="CommentInputContainer">
        <Box
        component="form"
        sx={{
            '& > :not(style)': { m: 1 },
        }}
        noValidate
        autoComplete="off"
        >
        <Input className="Input" placeholder="200 Characters max" inputProps={ariaLabel} value={commentInput} onChange={(event) => setCommentInput(event.target.value)}/>
        </Box>

        {/* Showing PopUp to Login if not Logged in */}
        {!token ? <CommentPopOver /> : 
        <IconButton data-testid='IconButton' className="Button" onClick={() => addComment(postID)} disabled={!commentInput} color="primary">
        <SendIcon  />
      </IconButton>
        }     
    </div>
  );
}