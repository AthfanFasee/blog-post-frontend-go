import './Comments.css'
import DeleteIcon from '@mui/icons-material/Delete';


function Comments({comment, deleteComment, userID}) {

  return <div className="CommentsContainer">
      <div>
        <p className="CommentUser">{comment.userName}</p>
        <p className="Comment">{comment.text}</p>
      </div>
      {userID === comment.createdBy && <DeleteIcon data-testid="deleteButton"  size="small" className="Delete" onClick={() => deleteComment(comment.id)}></DeleteIcon>}
      
  </div>
}

export default Comments;
