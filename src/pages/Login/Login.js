import { useNavigate } from 'react-router-dom';
import LoginElements from '../../Components/LoginElements/LoginElements';
import RegisterElements from '../../Components/RegisterElements/RegisterElements';
import {useContext} from 'react';
import './Login.css';
import { LoginPageContext } from '../../Helper/LoginPageContext/LoginPageProvider';
import {useLoginUserMutation, useRegisterUserMutation} from '../../services/LoginPageApi';

function Login() {

    const {loginPassword, loginEmail, registerUserName, registerPassword, isRegister, registerEmail, setError} =
     useContext(LoginPageContext);

    const navigate = useNavigate();

    const [login, ] = useLoginUserMutation()
    const [register] = useRegisterUserMutation()
    
    localStorage.getItem('userInfo')
    //Login
    const LoginUser = async () => {
        const {data, error} = await login({loginEmail, loginPassword})
        if(error) {
            setError(error.data.msg)
            return
        }                    
        localStorage.setItem('token', data.token);
        localStorage.setItem('userID', data.user.id);
        localStorage.setItem('userName', data.user.name);           
        navigate("/");
        window.location.reload();
    }


    //Register
    const RegisterUser = async () => {
            const {data, error} = await register({registerEmail, registerPassword, registerUserName})
            if(error) {
                setError(error.data.msg)
                return
            }           
            localStorage.setItem('token', data.token);
            localStorage.setItem('userID', data.user.id);
            localStorage.setItem('userName', data.user.name);           
            navigate("/");
            window.location.reload();
    }

    return (
        <div className="LoginAndRegister">
            {isRegister ? <RegisterElements RegisterUser={RegisterUser}/>
             : <LoginElements LoginUser={LoginUser}/>}       
            
        </div>
    )
}

export default Login;
