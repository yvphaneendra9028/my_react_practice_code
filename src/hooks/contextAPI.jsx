import React, { createContext,useState } from "react";

export const  ContextTheme = createContext();

function ContextAPI ({children}){
const[theme,setTheme] = useState('light');

const toggleTheme=()=> {
    setTheme((prev)=> theme==='light'? 'dark': 'light')
}

    return(
        <>
        <ContextTheme.Provider value={{theme,setTheme,toggleTheme}}>
            {children}
        </ContextTheme.Provider>
        </>
    )
}
export default ContextAPI;
