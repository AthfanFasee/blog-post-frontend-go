import { useContext } from "react";
import { HomePageContext } from "../../Helper/HomePageContexts/HomePageProvider";
import './UpdatePostForm.css';
import {useUpdatePostDispatch, useUpdatePostSelector} from '../../redux/redux-hooks';
import {updateInputValue} from '../../features/UpdateInputValues';
import FileUploadIcon from '@mui/icons-material/FileUpload';


export default function UpdatePost({updatePostButtonClick}) {

    const { file, setFile, isEditsection, error} = useContext(HomePageContext);
    const PostID = useUpdatePostSelector((state) => state.PostID.value);
    const UpdatedInputValues = useUpdatePostSelector((state) => state.UpdatedInputValues.value);
    const dispatch = useUpdatePostDispatch();

   
    return (
        <div className="UpdatePostBG">
        <div className="UpdatePostPage">
            <div className="UpdatePostContainer">
            <h1>Update Your Post</h1>
            {error && <h3 className="error">{`!! ${error}`}</h3>}
            <div className="UpdatePostInput">
                <label>New Post Title:</label>
                <input placeholder="200 Characters max" title="Title" value={UpdatedInputValues.newtitle}  onChange={(event) => dispatch(updateInputValue({newtitle: event.target.value, newpostText: UpdatedInputValues.newpostText, newreadTime: UpdatedInputValues.newreadTime}))}/>
            </div>
            <div className="UpdatePostInput">
                <label>New Post:</label>
                <textarea placeholder="Post..." title="TextArea" value={UpdatedInputValues.newpostText} onChange={(event) => dispatch(updateInputValue({newpostText: event.target.value, newtitle: UpdatedInputValues.newtitle, newreadTime: UpdatedInputValues.newreadTime}))} />
            </div>

            <div className="TimeandImg">
                <div className="TimeandInput">
                    <label className="Time">Time (min)</label>
                    <input className="TimeInput" type="number" min="1" max="20" value={UpdatedInputValues.newreadTime} onChange={(event) => dispatch(updateInputValue({newreadTime: Number(event.target.value), newpostText: UpdatedInputValues.newpostText, newtitle: UpdatedInputValues.newtitle}))}/>
                </div>
                <div className="UpdatePostInput">
                    <div className="EditImagendIcon">
                        <label for="files" className="EditImage">Image</label>
                        <label for="files"><FileUploadIcon className="EditImageIcon"/></label>
                        {file && <div>{file.name}</div>}
                        <input type="file" id="files" style={{display: "none"}} title="Img" onChange={(event) => setFile(event.target.files[0])} /> 
                    </div>         
                </div>
            </div>
            
            <button disabled={!UpdatedInputValues.newpostText || !UpdatedInputValues.newtitle} onClick={() => updatePostButtonClick(PostID)}>Save Changes</button>
            <button onClick={() => isEditsection(false)}>Cancel</button>
            </div>
        </div>
        </div>
        
    )
}


