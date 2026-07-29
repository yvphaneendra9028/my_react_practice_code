import { Link, useNavigate } from "react-router-dom";
import { useContext,useState,useRef,useEffect } from "react";
import { AuthContext } from "./hooks/AuthContext";
import "./Navbar.css";


function Navbar() {

    const { user, logout } = useContext(AuthContext);

    const [showDropdown,setShowDropdown] = useState(false);

    const dropdownRef = useRef();

    const navigate = useNavigate();



    const handleLogout = ()=>{

        logout();

        setShowDropdown(false);

        navigate("/login");

    }



    // close dropdown when clicking outside
    useEffect(()=>{

        const handleClickOutside=(event)=>{

            if(
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ){

                setShowDropdown(false);

            }

        }


        document.addEventListener(
            "mousedown",
            handleClickOutside
        );


        return ()=>{

            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

        }


    },[]);



    return (

        <nav className="navbar">


            <div className="logo">
                React Practice Code
            </div>



            {
            user ? (

                <div className="nav-right">


                    <div className="welcome-message">
                        Welcome, {user.username}
                    </div>



                    <div className="menu nav-links">


                    {
                    user.role === "user" && (
                        <>
                            <Link to="/dashboard">
                                Dashboard
                            </Link>


                            <Link to="/orders">
                                Orders
                            </Link>
                        </>
                    )
                    }



                    {
                    user.role === "admin" && (

                        <Link to="/products">
                            Products
                        </Link>

                    )
                    }



                    {/* Profile Image */}

                    <div 
                    className="profile-container"
                    ref={dropdownRef}
                    >

                        <img
                        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        className="profile-image"
                        alt="profile"
                        onClick={()=>
                            setShowDropdown(prev=>!prev)
                        }
                        />



                        {
                        showDropdown && (

                            <div className="profile-dropdown">

                                <p>
                                    {user.username}
                                </p>


                                <button
                                onClick={handleLogout}
                                >
                                    Logout
                                </button>


                            </div>

                        )
                        }


                    </div>


                    </div>


                </div>


            )
            :
            (

                <div className="menu nav-links">

                    <Link to="/login">
                        Login
                    </Link>

                </div>

            )
            }


        </nav>

    );

}

export default Navbar;