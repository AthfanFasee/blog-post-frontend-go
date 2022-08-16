import { useEffect, useContext } from "react";
import {useNavigate} from 'react-router-dom';
import CreatePostElmnts from "../../Components/CreatePostForm/CreatePostForm";
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

    const { file, title, postText, readTime,  setError} = useContext(CreatePostContext);

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    //Adding Post
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
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                const readTimeFormated = readTime + " mins"
                const {error} = await createPost({title, postText, img: downloadURL, readTime: readTimeFormated})
                if(error) {
                  if (typeof error.data.error == "string" ) {
                      setError(error.data.error)
                  } else if (Object.values(error.data.error)[1]) {
                      setError(`${Object.values(error.data.error)[0]} and ${Object.values(error.data.error)[1]}`)
                  } else {
                      setError(`${Object.values(error.data.error)[0]}`)
                  }
                  return
                }

                localStorage.removeItem("Title");
                localStorage.removeItem("PostText");
                localStorage.removeItem("ReadTime");
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
        localStorage.removeItem("ReadTime");
        navigate("/");
    }

    //If page reloads whatever we typed inside createElement inputs will stay still
    useEffect(()=>{
        localStorage.setItem("Title" , title);
        localStorage.setItem("PostText" , postText);
        localStorage.setItem("ReadTime" , readTime);
    },[title, postText, readTime]);

    
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
