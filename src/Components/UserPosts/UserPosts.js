import DeleteButton from "../DeleteButton/DeleteButton";
import UpdateButton from "../UpdateButton/UpdateButton";
import {  useEffect, useState } from "react";
import './UserPosts.css';
import CommentIcon from '@mui/icons-material/Comment';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import LikePopOver from "../LikePopOver/LikePopOver";
import Comments from "../Comments/Comments";
import CommentInput from "../CommentInput/CommentInput";
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import {useSelector} from 'react-redux';
import {useAddLikeMutation, useDisLikeMutation, useLazyFetchCommentsQuery, useAddCommentMutation, useDeleteCommentMutation} from '../../services/Like&CommentApi';
import DefaultPostImg from './DefaultPostImg.png';


function UserPosts({post}) {
    //Either Updated Post or Default Post is saved here to live render when post is edited
    const [Post, setPost] = useState(post);

    const [commentData, setCommentData] = useState("");
    const [commentInput, setCommentInput] = useState("");
    //to Render Comments Section
    const [isComments, setIsComments] = useState(false);

    const userID = Number(localStorage.getItem('userID'));
    const token = localStorage.getItem('token');
    
    //Modifying Time
    let time = Post.createdAt.split('T').join(', ');
    time = time.slice(0, 17);

    //To re-render a post as soon as it's updated
    const updatedPost = useSelector((state) => state.updatePost.value);
    
    //Conditionally Rendering the Original Post or the Updated Post if the Post got Updated
    useEffect(() => {
      setPost(updatedPost.id === post.id ? updatedPost : post)
    }, [updatedPost, post])

    //Like Button Section
    const [ triggerLikePost] = useAddLikeMutation()
    const [ triggerDisLikePost] = useDisLikeMutation()
    
    const likePost = async () => {
        const {data} = await triggerLikePost({postID: Post.id, userID});
        setPost(data.post)  //Live updating likes count and like icon      
    }

    const disLikePost = async () => {
      const {data} = await triggerDisLikePost({postID: Post.id, userID});
      setPost(data.post);  //Live updating likes count and like icon     
    }

    //Showing alert if user isnt logged in but tried to like the post
    //Otherwise showing the correct like button(Empty or filled)
    let likeButton;
    if(!token) {
      likeButton = <LikePopOver />;
    } else if (Post?.likedBy?.includes(userID)) {
      likeButton = <ThumbUpAltIcon fontSize="medium" onClick ={disLikePost}/>;
    } else {
      likeButton = <ThumbUpOffAltIcon fontSize="medium"  onClick ={likePost}/>;
    }
    
    //Comment Functionality
    const [triggerFetchComments] = useLazyFetchCommentsQuery();
    const [triggerAddComment] = useAddCommentMutation();
    const [triggerDeleteComment] = useDeleteCommentMutation();

    const CommentButtonClick = async () => {
        const {data} = await triggerFetchComments({postID: post.id});
        setCommentData(data.comments); //This Comment Data state will handle refetching as well      
        setIsComments(true);   
    }

    const addComment = async (postID) => {
        await triggerAddComment({commentInput, postID});
        CommentButtonClick();
        setCommentInput("");
    }


    const deleteComment = async (id) => {
        await triggerDeleteComment({id});
        CommentButtonClick();
    }

    return (        
          <div className="post">
            <div className="TitlendImage">
            <div className="TitleandReading">
            <div className="postHeader"><h1>{Post.title}</h1></div>
            <h4 className="readTime">({Post.readTime} reading)</h4>
            </div>
            <img className="postImage" src={Post.img? Post.img : DefaultPostImg} alt=""/>
          </div>

             <div className="postContentContainer">
                  <div className="postTextContainer">{Post.postText}</div>
                  <h4 className="Aurthor">Posted by: {Post.userName}</h4>
                  <div className="PostTime">@{time}</div>   
              </div>   

              <div className="UpdateButton">
              {/*Showing UpdateButton(Edit Button) only when the user who posted the post LoggedIn. Passing post as props so I can access post.id and stuffs to set them to states */}     
              {userID === post.createdBy && 
              <div><UpdateButton Post={Post}/></div>
              }        
            </div>

            

            <div className="LikeandCommentDeleteContainer">

              {/* Showing like button according to if the user alrdy liked the post or not */}           
              <div className="LikeIcon">{likeButton}</div>
              <p className="likesCount">{Post.likedBy ? Post.likedBy.length : 0}</p> 


              {/* Conditionally Rendering CommentsIcon */}
              {isComments ?  <CloseFullscreenIcon onClick={() => setIsComments(false)} className="commentsIcon" fontSize="medium" /> :
              <CommentIcon onClick={CommentButtonClick} fontSize="medium" className="commentsIcon"/>}


              {/*Showing DeleteButton only when the user who posted the post LoggedIn*/}
              {userID === post.createdBy &&
              <div className="DeleteButton"><DeleteButton post={Post}/></div>
              }
            </div>


            {/* If comment Icon is clicked Rendering Commend Input and Comments on Screen */}      
            {isComments && <CommentInput postID={Post.id} addComment={addComment} setCommentInput={setCommentInput} commentInput={commentInput}/>}
            <div className="AllComments">
              
            {isComments && commentData?.map(comment => {
              return (
                <div key={comment.id}>
                  <Comments userID={userID} comment={comment} deleteComment={deleteComment}/>
                </div>
              )             
            })}
            </div>                        
          </div>
    )
}

export default UserPosts;
