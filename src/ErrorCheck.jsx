import React from "react";

function ErrorCheck(){

    const users = null;


    return (
        <>
            {
                users.map(user => (
                    <h2>
                        {user.name}
                    </h2>
                ))
            }
        </>
    )

}

export default ErrorCheck;