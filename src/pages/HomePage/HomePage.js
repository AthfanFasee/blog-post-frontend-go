import {useContext} from "react";
import UpdatePostForm from "../../Components/UpdatePostForm/UpdatePostForm";
import UserPosts from "../../Components/UserPosts/UserPosts";
import { HomePageContext } from "../../Helper/HomePageContexts/HomePageProvider";
import Pagination from '../../Components/HomePageComponents/Pagination/Pagination';
import SortButton from "../../Components/HomePageComponents/SortingButton/SortingButton";
import BackToTop from "../../Components/HomePageComponents/ScrollToTopButton/ScrollToTopButton";
import './HomePage.css';
import LoadingComponent from "../../Components/HomePageComponents/LoadingComponent/LoadingComponent";
import {useSelector} from 'react-redux';
import {useGetPostsQuery, useUpdatePostMutation} from '../../services/PostsApi';
import app from '../../firebase';
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";



function HomePage() {

  const {setFile, file, editsection, isEditsection, setError} = useContext(HomePageContext);

  let UpdateInputValue = useSelector((state) => state.UpdatedInputValues.value);
  const UserIDParam = useSelector((state) => state.Params.value.userId);
  const page = useSelector((state) => state.Params.value.page);
  const sort = useSelector((state) => state.Params.value.sort);

  const token = localStorage.getItem('token');

   //Getting Posts from MongoDB when the HomePage Component is rendered
  const { data : PostsList, isFetching } = useGetPostsQuery({page, sort, UserIDParam})
    
  //Updating Post
  const [UpdatePost] = useUpdatePostMutation();
  
  const updatePostButtonClick = async (PostID) => {
    if(file) {
      //If User Uploads a new Image
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
          alert(error);
        },
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          UpdateInputValue = {...UpdateInputValue, newImgURL:downloadURL };
          const {error} = await UpdatePost({PostID, UpdateInputValue});
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
          setFile(null)
          isEditsection(false);           
          });
        }
      );        
    } else {
      //If User didn't Upload a new Image
      const {error} = await UpdatePost({PostID, UpdateInputValue});
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
      isEditsection(false);  
    }          
  }
   
  return (
    <div className="homePage">

      {/*Warning Users to SignIn when they are not SignedIn */}
      {!token && <p className="signInWarning">Please Login to Create Your Own Posts !!</p>} 
      
      {/* Sort Button */}
      {!editsection && 
      <div className="SortButtonContainer">
      <SortButton/>
      </div>
      }
      
        
      {/* Page SetUp(Pagination) */}
      {!editsection && <Pagination pageCount={PostsList?.metadata?.last_page}/>}

      <BackToTop />

      {/* Loading Icon */}
      {isFetching && <LoadingComponent />}


      {/*Showing Posts when HomePage Component is Rendered */}
      {PostsList?.posts.map((post) => {
        return( 
          <div key={post.id}>
          <UserPosts post={post}/>
          </div> 
         )
      })}


    {/* Rendering UpdatePost Component only when UpdateButton is clicked */}
    {editsection && 
    <UpdatePostForm updatePostButtonClick={updatePostButtonClick}/>
    }  
    
    </div>)
}

export default HomePage;
