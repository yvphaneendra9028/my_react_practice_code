import "./App.css";


import Login from "./login";
import Dashboard from "./Dashboard";
import ProtectedRoute from "./Features/ProtectedRoutes";
import React, { Suspense, lazy } from "react";
import { Route, Routes, Link,Navigate } from "react-router-dom";


function Approutes(){
    return(
        <>
        
               <div className="container">


            <Routes>


               
                <Route 
       path="/" 
       element={<Navigate to="/" />}
    />

                <Route
                path="/login"
                element={<Login />}
            />

                <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />


            </Routes>


        </div>

        
        </>
    )
}
export default Approutes;