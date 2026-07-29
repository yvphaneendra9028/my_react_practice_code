import React, { useState, useContext, useEffect } from "react";
import { useNavigate} from "react-router-dom";
import { AuthContext } from "./hooks/AuthContext";

import { loginUser} from "./services/userService";
import "./Login.css";
import { Link } from "react-router-dom";
import Register from "./Register";
import { toast } from "react-toastify";


function Login(){

    const [form,setForm] = useState({
        email:'',
        password:''
    });
    const [errors,setErrors] = useState({})

    const { login  } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleFields=(e)=>{

        const {name,value} = e.target;

        setForm((prev)=>({
            ...prev,
            [name]:value
        }));
        setErrors((prev)=>({
        ...prev,
        [name]:""
    }));

    }

    const validateForm = () => {

    let newErrors = {};

    if (!form.email.trim()) {
        newErrors.email = "Email is required";
    } 
    else if (!/\S+@\S+\.\S+/.test(form.email)) {
        newErrors.email = "Enter a valid email";
    }


    if (!form.password.trim()) {
        newErrors.password = "Password is required";
    }
    


    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
};


    const handleSubmit = async (e) => {
        e.preventDefault();

         const isValid = validateForm();

    if(!isValid){
        return;
    }

        try {

            const response = await loginUser(form);
            console.log("Login response:", response.data);
            login(response.data.user);
             
            navigate("/dashboard");
            toast.success("Logged in Successfully");
        } 
        catch (error) {
            console.log(
                error.response?.data?.message || "Login failed",
                error
            );
            toast.success(error.response?.data?.message || "Login failed",
                error);
                setForm({
                    email:'',
                password:''     
            })
        }
    };

 useEffect(() => {
    document.body.classList.add("login-body");

    return () => {
      document.body.classList.remove("login-body");
    };
  }, []);


    return(

        <div className="login-wrapper login-body" >
            <div className="login-box">
                <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Email</label>

                            <input type="text" name="email" value={form.email} onChange={handleFields} 
                            placeholder="Enter email"/>

                            {errors.email && (<span className="error">{errors.email}</span>)}

                        </div>
                        <div className="form-group">

                        <label>Password</label>

                            <input type="password" name="password" value={form.password} onChange={handleFields}
                            placeholder="Enter password"/>
                            {errors.password && (<span className="error">{errors.password}</span>)}

                        </div>
                        <button type="submit" className="loginbutton">Login</button>
                        <br/><br/>
                            <div>Already have an account? <Link to="/register">Register</Link></div>  
                        </form>


            </div>


        </div>

    )

}


export default Login;