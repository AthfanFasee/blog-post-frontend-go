import { useContext } from 'react';
import { LoginPageContext } from '../../Helper/LoginPageContext/LoginPageProvider';
import './RegisterForm.css';


function Register({RegisterUser}) {

    const {setRegisterUserName, setRegisterPassword, setIsRegister, setRegisterEmail, registerError, setRegisterError} =
     useContext(LoginPageContext)

    return (
    <div className="RegisterMainContainer">
        <div className="RegisterrContainer">
        <h1>Register Here</h1>   
       {registerError && <h3 className="Regerror">{`!! ${registerError}`}</h3>}  

        <div className="RegInputContainer">
            <label>Email:</label>
            <input placeholder="Email..." onChange={(event) => setRegisterEmail(event.target.value)} />
        </div>
        <div className="RegInputContainer">
            <label>Username:</label>
            <input placeholder="Name..." onChange={(event) => setRegisterUserName(event.target.value)}/>
        </div>
        <div className="RegInputContainer">
            <label>Password:</label>
            <input placeholder="min 6 characters, max 72 characters" onChange={(event) => setRegisterPassword(event.target.value)}/>
        </div>
        <button onClick={RegisterUser}>Submit</button>
        <div className="RegisterText">
            <p>Already Registered?</p>
        <button onClick={() => {
            setIsRegister(false)
            setRegisterError("")
            }} className="LoginButton">Login Here</button>
        </div>
        </div>
    </div>
    
  )
}

export default Register;
