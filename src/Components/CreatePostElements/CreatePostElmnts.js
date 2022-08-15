import { useContext } from 'react';
import { CreatePostContext } from '../../Helper/CreatePostContext/CreatePostProvider';
import './CreatePostElement.css';
import FileUploadIcon from '@mui/icons-material/FileUpload';

function CreatePostElmnts({Cancel, CreatePostButtonClick}) {
    
    const {file, setFile, title, setTitle, postText, setPostText, error} = useContext(CreatePostContext);

    return (
        <div className="createPostPage">
            <div className="cpContainer">
            <h1>Create A Post</h1>
            {error && <h3 className="error">{`!! ${error}`}</h3>}
            <div className="inputGp">
                <label>Title:</label>
                <input placeholder="Title.." value={title}  onChange={(event) => setTitle(event.target.value)}/>
            </div>
            <div className="inputGp">
                <label>Post:</label>
                <textarea placeholder="Post..." value={postText} onChange={(event) => setPostText(event.target.value)} />
            </div>
            <div className="inputGp">
                <div className="AddImagendIcon">
                    <label for="files" className="AddImage">Add Image</label>
                    <label for="files" className="AddImageIcon"><FileUploadIcon className="AddImageIcon"/></label>
                    {file && <div>{file.name}</div>}
                    <input className="hiddenInput" type="file" id="files" style={{display: "none"}} onChange={(event) => setFile(event.target.files[0])} />
                </div>                      
            </div>
            
            <button disabled={!title || !postText}  onClick={CreatePostButtonClick}>Submit Post</button>
            <button onClick={Cancel}>Cancel</button>
            </div>
        </div>
    )
}

export default CreatePostElmnts;

