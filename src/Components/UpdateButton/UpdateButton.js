import { useContext } from "react";
import { HomePageContext } from "../../Helper/HomePageContexts/HomePageProvider";
import {updateInputValue} from '../../features/UpdateInputValues';
import {updatePostID} from '../../features/PostID';
import {useUpdateButtonDispatch}from '../../redux/redux-hooks';


function UpdateButton({Post}) {
  const {isEditsection} = useContext(HomePageContext);

  const dispatch = useUpdateButtonDispatch();

    return (
        <div>
            <button 
                  title="Update"
                  onClick={() => { 
                  dispatch(updatePostID( Post._id))                          
                  isEditsection(true)       
                  //When users go to update section the Post's title and text will already be in the input elements.
                  //If user already updated the Post, when they click edit button again, showing them the updated values in input elements.
                  dispatch(updateInputValue({newtitle: Post.title, newpostText: Post.postText}))                          
              }}>&#128394;</button>
        </div>
    )
}

export default UpdateButton;
