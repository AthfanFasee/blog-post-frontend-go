import { useContext } from 'react';
import { LoginPageContext } from '../../Helper/LoginPageContext/LoginPageProvider';
import './LoginElements.css';

function LoginButton({LoginUser}) {
    
    const {setError, error, setIsRegister, setLoginEmail, setLoginPassword } =
     useContext(LoginPageContext);

    return (
        <div className="MainContainer">
        <div className="LogInContainer">
        <h1>Login with your Email</h1>
        {error && <h3 className="error">{`!! ${error}`}</h3>}
        
        <div className="LoginInput">
            <label>Email:</label>
            <input placeholder="Email..." onChange={(event) => setLoginEmail(event.target.value)}/>
        </div>
        <div className="LoginInput">
            <label>Password:</label>
            <input placeholder="Password..." onChange={(event) => setLoginPassword(event.target.value)}/>
        </div>
        <button onClick={LoginUser} >Login</button>
        <div className="RegisterContainer">
            <p className="LoginText">Don't have an account?</p>
        <button onClick={() => {
            setIsRegister(true)
            setError("")
            }} className="Register">Register Here</button>
        </div>
        </div>
    </div>
    
    )
}

export default LoginButton;
