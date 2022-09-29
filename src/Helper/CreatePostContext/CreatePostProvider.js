import { createContext, useState } from "react";


export const CreatePostContext = createContext(null)

export function CreatePostProvider({children}) {

    //to save input elements' value
    const [title, setTitle] = useState( localStorage.getItem("Title") || "");
    const [postText, setPostText] = useState(localStorage.getItem("PostText") || "");
    const [readTime, setReadTime] = useState(Number(localStorage.getItem("ReadTime")) || 1);

    const [file, setFile] = useState(null);

     //to catch errors
     const [error, setError] = useState("");
    
     // to block button click
     const [blocked, setBlocked] = useState(false);
    return (
        <CreatePostContext.Provider value={{setBlocked, blocked, file, setFile, title, setTitle, postText, setPostText, error, setError, readTime, setReadTime}}>
            {children}
        </CreatePostContext.Provider>
    )
}


