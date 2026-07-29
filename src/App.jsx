import AppRoutes from "./App.routes";
import ErrorBoundary from "./components/ErrorBoundary";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./hooks/AuthContext";
import Navbar from "./Navbar";
import { ToastContainer } from "react-toastify";



function App() {

   


    return (
        <ErrorBoundary>

            <Navbar />

            <AppRoutes />
             <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
      />

        </ErrorBoundary>
    );
}


export default App;

