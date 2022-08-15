import { useContext } from "react";
import { HomePageContext } from "../../Helper/HomePageContexts/HomePageProvider";
import './UpdatePost.css';
import {useUpdatePostDispatch, useUpdatePostSelector} from '../../redux/redux-hooks';
import {updateInputValue} from '../../features/UpdateInputValues';
import FileUploadIcon from '@mui/icons-material/FileUpload';


export default function UpdatePost({updatePostButtonClick}) {

    const { file, setFile, isEditsection} = useContext(HomePageContext);
    const PostID = useUpdatePostSelector((state) => state.PostID.value);
    const UpdatedInputValues = useUpdatePostSelector((state) => state.UpdatedInputValues.value);
    const dispatch = useUpdatePostDispatch();

   
    return (
        <div className="UpdatePostBG">
        <div className="UpdatePostPage">
            <div className="UpdatePostContainer">
            <h1>Update Your Post</h1>
            <div className="UpdatePostInput">
                <label>New Post Title:</label>
                <input placeholder="Title.." title="Title" value={UpdatedInputValues.newtitle}  onChange={(event) => dispatch(updateInputValue({newtitle: event.target.value, newpostText: UpdatedInputValues.newpostText}))}/>
            </div>
            <div className="UpdatePostInput">
                <label>New Post:</label>
                <textarea placeholder="Post..." title="TextArea" value={UpdatedInputValues.newpostText} onChange={(event) => dispatch(updateInputValue({newpostText: event.target.value, newtitle: UpdatedInputValues.newtitle}))} />
            </div>
            <div className="UpdatePostInput">
            <div className="EditImagendIcon">
                    <label for="files" className="EditImage">Edit Image</label>
                    <label for="files"><FileUploadIcon className="EditImageIcon"/></label>
                    {file && <div>{file.name}</div>}
                    <input type="file" id="files" style={{display: "none"}} title="Img" onChange={(event) => setFile(event.target.files[0])} /> 
            </div>         
            </div>
            
            <button disabled={!UpdatedInputValues.newpostText || !UpdatedInputValues.newtitle} onClick={() => updatePostButtonClick(PostID)}>Save Changes</button>
            <button onClick={() => isEditsection(false)}>Cancel</button>
            </div>
        </div>
        </div>
        
    )
}


