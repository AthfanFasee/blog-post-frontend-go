import { createContext, useState } from "react";


export const CreatePostContext = createContext(null)

export function CreatePostProvider({children}) {

    //to save input elements' value
    const [title, setTitle] = useState( localStorage.getItem("Title") || "");
    const [postText, setPostText] = useState(localStorage.getItem("PostText") || "");
    const [file, setFile] = useState(null);

     //to catch errors
     const [error, setError] = useState("");
    
    return (
        <CreatePostContext.Provider value={{file, setFile, title, setTitle, postText, setPostText, error, setError}}>
            {children}
        </CreatePostContext.Provider>
    )
}


