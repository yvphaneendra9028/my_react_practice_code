
import React,{useContext} from "react";
import { ContextTheme } from "./hooks/contextAPI";

function ChangeTheme(){
    const {theme,toggleTheme} = useContext(ContextTheme);
    return(
        <>
        <h2>Change Theme using Context API</h2>
                <h2>{theme}</h2>
        <button onClick={toggleTheme}>Change Theme</button>

        <div
           style={{
            backgroundColor:theme=='light'? 'white' : 'black',
            color:theme==='light'?'#FFF': 'black',
             padding: "20px"
           }}>
                
        </div>
        </>
    )
}

export default ChangeTheme;