import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../hooks/AuthContext";


function ProtectedRoutes({ children }) {

    const { token } = useContext(AuthContext);


    if (!token) {
        return <Navigate to="/login" replace />;
    }


    return children;
}


export default ProtectedRoutes;