import { createContext, useState } from "react";


export const HomePageContext = createContext(null)

export function HomePageProvider({children}) {

    //For all the posts in HomePage
    const [postLists, setPostLists] = useState([]);
          
    //To save noOfPages
    const [pageCount, setPageCount] = useState(1);

    //to render or not render Edit or Update menue
    const [editsection, isEditsection] = useState(false);

    //To get the new Image if user wanna edit image
    const [file, setFile] = useState(null);

    const [error, setError] = useState(null);
    
   
    return (
        <HomePageContext.Provider value={{file, setFile, pageCount, setPageCount, postLists, setPostLists, editsection, isEditsection, error, setError}}>
            {children}
        </HomePageContext.Provider>
    )
}


