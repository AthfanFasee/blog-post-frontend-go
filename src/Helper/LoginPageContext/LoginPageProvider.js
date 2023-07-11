import { createContext, useState } from "react";


export const LoginPageContext = createContext(null);

export function LoginPageProvider({children}) {

    //To render register form
    const [isRegister, setIsRegister] = useState(false);

    //in Register form
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerUserName, setRegisterUserName] = useState("");


    //in Login Form
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    //to catch errors
    const [registerError, setRegisterError] = useState("");
    const [loginError, setLoginError] = useState("");

    
    
    return (
        <LoginPageContext.Provider value={{loginError, setLoginError, setLoginPassword, loginPassword, setLoginEmail, loginEmail, setRegisterUserName, registerUserName, setRegisterPassword, registerPassword, isRegister, setIsRegister, registerEmail, setRegisterEmail, registerError, setRegisterError}}>
            {children}
        </LoginPageContext.Provider>
    )
}


