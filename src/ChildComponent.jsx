import React from "react";
function ChildComponent({title,difficult}){
    return (

        <>
        <div> I am child component under {title} , my difficult topic to remember in coding is {difficult} </div>

        </>
    )
}

export default React.memo(ChildComponent);

