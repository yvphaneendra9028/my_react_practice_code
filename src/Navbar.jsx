import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./hooks/AuthContext";
import "./Navbar.css";


function Navbar(){

    const { token, logout } = useContext(AuthContext);


    return(

        <nav className="navbar">


            <div className="logo">
                MyApp
            </div>


            <div className="menu">


                {
                    !token &&
                    <Link to="/login">
                        Login
                    </Link>
                }


                {
                    token &&
                    <>
                        <Link to="/dashboard">
                            Dashboard
                        </Link>


                        <Link to="/users">
                            Users
                        </Link>


                        <Link to="/products">
                            Products
                        </Link>


                        <Link to="/profile">
                            Profile
                        </Link>


                        <button 
                            className="logout-btn"
                            onClick={logout}
                        >
                            Logout
                        </button>

                    </>
                }


            </div>


        </nav>

    )

}


export default Navbar;