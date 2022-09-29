import { useContext } from 'react';
import { CreatePostContext } from '../../Helper/CreatePostContext/CreatePostProvider';
import './CreatePostForm.css';
import FileUploadIcon from '@mui/icons-material/FileUpload';

function CreatePostElmnts({Cancel, CreatePostButtonClick}) {
    const {file, setFile, title, setTitle, postText, readTime, setReadTime, setPostText, error, blocked} = useContext(CreatePostContext);

    return (
        <div className="createPostPage">
            <div className="cpContainer">
            <h1>Create A Post</h1>
            {error && <h3 className="error">{`!! ${error}`}</h3>}
            <div className="inputGp">
                <label>Title:</label>
                <input placeholder="100 Characters max" value={title}  onChange={(event) => setTitle(event.target.value)}/>
            </div>
            <div className="inputGp">
                <label>Post:</label>
                <textarea placeholder="Post..." value={postText} onChange={(event) => setPostText(event.target.value)} />
            </div>

            <div className="TimeandImg">
                <div className="TimeandInput">
                    <label className="Time">Time (min)</label>
                    <input className="TimeInput" type="number" min="1" max="20" value={readTime} onChange={(event) => setReadTime(Number(event.target.value))} />
                </div>
                <div className="inputGp">
                    <div className="AddImagendIcon">
                        <label for="files" className="AddImage">Image</label>
                        <label for="files" className="AddImageIcon"><FileUploadIcon className="AddImageIcon"/></label>
                        {file && <div>{file.name}</div>}
                        <input className="hiddenInput" type="file" id="files" style={{display: "none"}} onChange={(event) => setFile(event.target.files[0])} />
                    </div>                   
                </div>
            </div>

            <button disabled={!title || !postText || blocked}  onClick={CreatePostButtonClick}>Submit Post</button>
            <button onClick={Cancel}>Cancel</button>
            </div>
        </div>
    )
}

export default CreatePostElmnts;

