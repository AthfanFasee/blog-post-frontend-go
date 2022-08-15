import './AppStyle/App.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Login from './pages/Login/Login';
import CreatePost from './pages/CreatePost/CreatePost';
import HomePage from './pages/HomePage/HomePage';
import {HomePageProvider} from './Helper/HomePageContexts/HomePageProvider';
import {CreatePostProvider} from './Helper/CreatePostContext/CreatePostProvider';
import {LoginPageProvider} from './Helper/LoginPageContext/LoginPageProvider';
import ProfileButton from './Components/HomePageComponents/ProfileButton/ProfileButton';


function App() {
  
  const token = localStorage.getItem('token');
  
  return (
    <Router>
      <nav>
      <Link to='/'>Home</Link>
        
        {!token ? <>
        <Link to='/login'>Login</Link>
          </>
         : (
           <>
           
         <Link to='/createpost'>Create Post</Link>

         <div className='ProfileButton'>
          <ProfileButton />
         </div>
       
      
         
         </>
         )}
      </nav>
      
      <Routes>
      
        <Route path='/' element={<HomePageProvider><HomePage /></HomePageProvider>} />
        <Route path='/createpost' element={<CreatePostProvider><CreatePost /></CreatePostProvider>} />
        <Route path='/login' element={<LoginPageProvider><Login /></LoginPageProvider>} />
        
      </Routes>
    </Router>
  )
}

export default App;
