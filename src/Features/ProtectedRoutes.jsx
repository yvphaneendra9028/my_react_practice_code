import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../hooks/AuthContext";


function ProtectedRoutes({ allowedRoles }) {

    const { user } = useContext(AuthContext);

    console.log("Protected User:", user);
    console.log("Allowed Roles:", allowedRoles);


    if (!user) {
        return <Navigate to="/login" replace />;
    }


    if (
        allowedRoles &&
        !allowedRoles.includes(user.role)
    ) {
        console.log("Role blocked");
        return <Navigate to="/dashboard" replace />;
    }


    return <Outlet />;
}

export default ProtectedRoutes;