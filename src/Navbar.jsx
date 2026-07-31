import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "./hooks/AuthContext";
import "./Navbar.css";

function Navbar() {

    const { user, logout } = useContext(AuthContext);

    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [openMenu, setOpenMenu] = useState(null);

    const dropdownRef = useRef();

    const navigate = useNavigate();

    // Logout
    const handleLogout = () => {

        logout();

        setShowProfileDropdown(false);

        navigate("/login");
    };


    // Toggle submenu
    const toggleMenu = (menuName) => {

        setOpenMenu(prev =>
            prev === menuName ? null : menuName
        );
    };


    // Close profile dropdown when clicking outside
    useEffect(() => {

        const handleClickOutside = (event) => {

            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setShowProfileDropdown(false);
            }
        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {

            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

        };

    }, []);


    return (

        <nav className="navbar">

            {/* Logo */}

            React Pro    


            {
                user ? (

                    <div className="nav-right">

                        {/* Welcome */}

                        <div className="welcome-message">
                            Welcome, {user.username}
                        </div>


                        {/* Navigation */}

                        <div className="menu nav-links">


                            {/* USER MENU */}

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



                            {/* ADMIN MENU */}

                            {
                                user.role === "admin" && (
                                    <>


                                        {/* PRODUCTS MENU */}

                                        <div className="nav-menu">

                                            <button
                                                className="menu-button"
                                                onClick={() =>
                                                    toggleMenu("products")
                                                }
                                            >
                                                Products ▾
                                            </button>


                                            {
                                                openMenu === "products" && (

                                                    <div className="submenu">

                                                        <Link
                                                            to="/products"
                                                            onClick={() =>
                                                                setOpenMenu(null)
                                                            }
                                                        >
                                                            Add Product
                                                        </Link>


                                                        <Link
                                                            to="/productList"
                                                            onClick={() =>
                                                                setOpenMenu(null)
                                                            }
                                                        >
                                                            Product List
                                                        </Link>

                                                    </div>

                                                )
                                            }

                                        </div>



                                        {/* PLANS MENU */}

                                        <div className="nav-menu">

                                            <button
                                                className="menu-button"
                                                onClick={() =>
                                                    toggleMenu("plans")
                                                }
                                            >
                                                Plans ▾
                                            </button>


                                            {
                                                openMenu === "plans" && (

                                                    <div className="submenu">

                                                        <Link
                                                            to="/plan"
                                                            onClick={() =>
                                                                setOpenMenu(null)
                                                            }
                                                        >
                                                            Add Plan
                                                        </Link>


                                                        <Link
                                                            to="/planList"
                                                            onClick={() =>
                                                                setOpenMenu(null)
                                                            }
                                                        >
                                                            Plan List
                                                        </Link>

                                                    </div>

                                                )
                                            }

                                        </div>


                                    </>
                                )
                            }



                         

                        </div>

                           {/* PROFILE */}

                            <div
                                className="profile-container"
                                ref={dropdownRef}
                            >

                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                    className="profile-image"
                                    alt="profile"
                                    onClick={() =>
                                        setShowProfileDropdown(
                                            prev => !prev
                                        )
                                    }
                                />


                                {
                                    showProfileDropdown && (

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
