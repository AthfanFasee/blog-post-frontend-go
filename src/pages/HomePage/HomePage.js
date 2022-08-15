import {useContext} from "react";
import UpdatePost from "../../Components/UpdatePost/UpdatePost";
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

  const {setFile, file, sort, setSort, page, editsection, isEditsection} = useContext(HomePageContext);

  let UpdateInputValue = useSelector((state) => state.UpdatedInputValues.value);
  const UserIDParam = useSelector((state) => state.UserIDParam.value);

  const token = localStorage.getItem('token');

   //Getting Posts from MongoDB when the HomePage Component is rendered
  const { data : PostsList, isFetching } = useGetPostsQuery({page, sort, UserIDParam })
    
  //Updating the Post(Editing the Post)
  const [triggerUpdatePost] = useUpdatePostMutation();
  
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
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          UpdateInputValue = {...UpdateInputValue, newImgURL:downloadURL };
          triggerUpdatePost({PostID, UpdateInputValue}); 
          localStorage.removeItem("Title");
          localStorage.removeItem("PostText");
          setFile(null)
          isEditsection(false);           
          });
        }
      );        
    } else {
      //If User didn't Upload a new Image
      await triggerUpdatePost({PostID, UpdateInputValue});
      localStorage.removeItem("Title");
      localStorage.removeItem("PostText"); 
      isEditsection(false);  
    }          
  }
   
  return (
    <div className="homePage">

      {/*Warning Users to SignIn when they are not SignedIn */}
      {!token && <p>Please Login to Create Your Own Posts</p>} 
      
      {/* Sort Button */}
      {!editsection && 
      <div className="SortButtonContainer">
      <SortButton setSort={setSort}/>
      </div>
      }
      
        
      {/* Page SetUp(Pagination) */}
      {!editsection && <Pagination pageCount={PostsList?.noOfPages}/>}

      <BackToTop />

      {/* Loading Icon */}
      {isFetching && <LoadingComponent />}


      {/*Showing Posts when HomePage Component is Rendered */}
      {PostsList?.posts.map((post) => {
        return( 
          <div key={post._id}>
          <UserPosts post={post}/>
          </div> 
         )
      })}


    {/* Rendering UpdatePost Component only when UpdateButton is clicked */}
    {editsection && 
    <UpdatePost updatePostButtonClick={updatePostButtonClick}/>
    }  
    
    </div>)
}

export default HomePage;
