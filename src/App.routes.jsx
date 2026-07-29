import "./App.css";


import Login from "./login";
import Dashboard from "./Dashboard";
import ProtectedRoute from "./Features/ProtectedRoutes";
import React, { Suspense, lazy } from "react";
import { Route, Routes, Link,Navigate } from "react-router-dom";
import Register from "./Register";
import Product from "./pages/Product";
import Orders from "./pages/Orders";

function Approutes(){
   
    return(
        <>
        
               <div className="container">


           <Routes>

    <Route 
        path="/" 
        element={<Navigate to="/login" />}
    />

    <Route
        path="/register"
        element={<Register />}
    />

    <Route
        path="/login"
        element={<Login />}
    />


    {/* All authenticated pages */}
    <Route element={<ProtectedRoute />}>

        <Route 
            path="/dashboard" 
            element={<Dashboard />} 
        />

    </Route>


    {/* Admin only pages */}
    <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>

        <Route 
            path="/products" 
            element={<Product />} 
        />

    </Route>


    {/* User only pages */}
    <Route 
    element={<ProtectedRoute allowedRoles={["user"]}/>}
>
    <Route 
        path="/orders" 
        element={<Orders />} 
    />
</Route>


</Routes>


        </div>

        
        </>
    )
}
export default Approutes;