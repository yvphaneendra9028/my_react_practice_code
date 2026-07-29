import AppRoutes from "./App.routes";
import ErrorBoundary from "./components/ErrorBoundary";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./hooks/AuthContext";
import Navbar from "./Navbar";


function App() {

   


    return (
        <ErrorBoundary>

            <Navbar />

            <AppRoutes />

        </ErrorBoundary>
    );
}


export default App;

