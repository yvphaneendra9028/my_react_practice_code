import React,{useState} from 'react';
import ChildComponent from './ChildComponent';
function ParentComponent(){
    const[count,setCount] = useState(0);

    const title= 'react components';
    const difficult = 'redux tool kit';
    return(
        <>
            <div >Hello Parent {count} </div>
            <button onClick={()=> setCount(count+1)}>Increment by 1</button>
            <ChildComponent title='Coding mistakes' difficult={difficult} />
            
        </>
    )
}


export default ParentComponent;