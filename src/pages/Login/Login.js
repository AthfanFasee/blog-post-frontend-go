import { useNavigate } from 'react-router-dom';
import LoginElements from '../../Components/LoginForm/LoginForm';
import RegisterElements from '../../Components/RegisterForm/RegisterForm';
import {useContext} from 'react';
import './Login.css';
import { LoginPageContext } from '../../Helper/LoginPageContext/LoginPageProvider';
import {useLoginUserMutation, useRegisterUserMutation} from '../../services/LoginPageApi';

function Login() {

    const {loginPassword, loginEmail, registerUserName, registerPassword, setIsRegister, isRegister, registerEmail, setRegisterError, setLoginError} =
     useContext(LoginPageContext);

    const navigate = useNavigate();

    const [login] = useLoginUserMutation()
    const [register] = useRegisterUserMutation()
    
    localStorage.getItem('userInfo')
    //Login
    const LoginUser = async () => {
        const {data, error} = await login({loginEmail, loginPassword})
        if(error) {
            if (typeof error.data.error == "string" ) {
                setLoginError(error.data.error)
            } else if (Object.values(error.data.error)[1]) {
                setLoginError(`${Object.values(error.data.error)[0]} and ${Object.values(error.data.error)[1]}`)
            } else {
                setLoginError(`${Object.values(error.data.error)[0]}`)
            }
            return
        }

        localStorage.setItem('token', data.authentication_token.token);
        localStorage.setItem('userID', data.authentication_token.userID);
        localStorage.setItem('userName', data.userName);           
        navigate("/");
        window.location.reload();
    }


    //Register
    const RegisterUser = async () => {
            const {error} = await register({registerEmail, registerPassword, registerUserName})
            if(error) {
                if (typeof error.data.error == "string" ) {
                    setRegisterError(error.data.error)
                } else if (Object.values(error.data.error)[1]) {
                    setRegisterError(`${Object.values(error.data.error)[0]} and ${Object.values(error.data.error)[1]}`)
                } else {
                    setRegisterError(`${Object.values(error.data.error)[0]}`)
                }
                return
            }
            setIsRegister(false)
    }

    return (
        <div className="LoginAndRegister">
            {isRegister ? <RegisterElements RegisterUser={RegisterUser}/>
             : <LoginElements LoginUser={LoginUser}/>}       
            
        </div>
    )
}

export default Login;
