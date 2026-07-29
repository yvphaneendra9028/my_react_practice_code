import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./hooks/AuthContext";
import { registerUser} from "./services/userService";
import "./Login.css";
import { toast } from "react-toastify";

function Register(){

    const [form,setForm] = useState({
        username:'',
        email:'',
        password:''
    });

    const [errors,setErrors] = useState({});


    const navigate = useNavigate();

    const { login } = useContext(AuthContext);

    const validateForm = ()=> {
        let newErrors = {};
         if(!form.username.trim()){
            newErrors.username = "Username is required";
         }
         if(!form.email.trim()){
            newErrors.email = "Email is required";
         }
         if(!form.password.trim()){
            newErrors.password = "Password is required";
         }
          return Object.keys(newErrors).length === 0 ? null : newErrors;

    }


    const handleFields=(e)=>{

        const {name,value} = e.target;

        setForm((prev)=>({
            ...prev,
            [name]:value
        }));

        setErrors((prev)=>({    
           ...prev,
        [name]:""
        }))
    }

  const handleSubmit = async (e) => {
    e.preventDefault();
  const validationErrors = validateForm();

if(validationErrors){
    setErrors(validationErrors);
    return;
}

    try {
        const response = await registerUser(form);
        const resp = response.data;
        console.log('response--------------------',resp);

        toast.success("Registration Successful");
        

// reset form fields
        setForm({
            username:'',
            email:'',
            password:''
        });
       

    } catch (error) {
        console.log(error.response?.data?.message || "Registration failed", error);
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
                <h2>Register </h2>


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
                        {errors.username && <p className="error">{errors.username}</p>}

                    </div>  <div className="form-group">

                        <label>
                            Email
                        </label>

                        <input
                        type="text"
                        name="email"
                        value={form.email}
                        onChange={handleFields}
                        placeholder="Enter email"
                        />
                      {errors.email && <p className="error">{errors.email}</p>}
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

                        {errors.password && <p className="error">{errors.password}</p>}

                    </div>



                    <button type="submit" className="loginbutton">
                        Register
                    </button>


                </form>


            </div>


        </div>

    )

}


export default Register;