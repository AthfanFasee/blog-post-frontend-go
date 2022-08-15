import { useEffect, useContext } from "react";
import {useNavigate} from 'react-router-dom';
import CreatePostElmnts from "../../Components/CreatePostElements/CreatePostElmnts";
import './CreatePost.css';
import {CreatePostContext} from '../../Helper/CreatePostContext/CreatePostProvider';
import {useCreatePostMutation} from '../../services/PostsApi';
import app from '../../firebase';
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
  } from "firebase/storage";





function CreatePost() {

    const { file, title, postText, setError} = useContext(CreatePostContext);

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    //Adding Post to MongoDB
    const [createPost] = useCreatePostMutation()

    const CreatePostButtonClick = () => {
        if(file) {
            //Getting Image Ready 
            const fileName = new Date().getTime() + file.name;
            const storage = getStorage(app);
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
        
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                switch (snapshot.state) {
                  case "paused":
                    console.log("Upload is paused");
                    break;
                  case "running":
                    console.log("Upload is running");
                    break;
                  default:
                }
              },
              (error) => {
                alert(error)
              },
              () => {
                // Handle successful uploads on complete
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                createPost({title, postText, img: downloadURL})  
                localStorage.removeItem("Title");
                localStorage.removeItem("PostText");
                navigate('/')
                });
              }
            );      
        } else {
          setError('Please Provide an Image')
        }      
    }

    //For Cancel button
    const Cancel = () => {
        localStorage.removeItem("Title");
        localStorage.removeItem("PostText");
        navigate("/");
    }

    //If page reloads whatever we typed inside createElement inputs will stay still
    useEffect(()=>{
        localStorage.setItem("Title" , title);
        localStorage.setItem("PostText" , postText);
    },[title, postText]);

    
    //redirecting nonSignedIn users back to login if they try and access createPost Page
    useEffect(() => {
        if(!token) {
            navigate('/');
        }
    });

    return (
        <div className="CreatePage">
            <CreatePostElmnts Cancel={Cancel} CreatePostButtonClick={CreatePostButtonClick} />
        </div>
        
    )
}

export default CreatePost;
