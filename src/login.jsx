import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./hooks/AuthContext";
import "./Login.css";


function Login(){

    const [form,setForm] = useState({
        username:'',
        password:''
    });


    const navigate = useNavigate();

    const { login } = useContext(AuthContext);



    const handleFields=(e)=>{

        const {name,value} = e.target;

        setForm((prev)=>({
            ...prev,
            [name]:value
        }));

    }



    const handleSubmit=(e)=>{

        e.preventDefault();

        console.log(form);


        login("1234567890");


        navigate("/dashboard");

    }
 useEffect(() => {
    document.body.classList.add("login-body");

    return () => {
      document.body.classList.remove("login-body");
    };
  }, []);


    return(

        <div className="login-wrapper login-body" >


            <div className="login-box">


                <h2>
                    Login
                </h2>


                <form onSubmit={handleSubmit}>


                    <div className="form-group">

                        <label>
                            Username
                        </label>

                        <input
                        type="text"
                        name="username"
                        value={form.username}
                        onChange={handleFields}
                        placeholder="Enter username"
                        />

                    </div>



                    <div className="form-group">

                        <label>
                            Password
                        </label>

                        <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleFields}
                        placeholder="Enter password"
                        />

                    </div>



                    <button type="submit" className="loginbutton">
                        Login
                    </button>


                </form>


            </div>


        </div>

    )

}


export default Login;