import React, { useState } from "react";

function Form() {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        age: "",
        username: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

    // Validate a single field
    const validateField = (name, value) => {
        switch (name) {
            case "firstName":
                return value.trim() ? "" : "First Name is required";

            case "lastName":
                return value.trim() ? "" : "Last Name is required";

            case "age":
                return value.trim() ? "" : "Age is required";

            case "username":
                return value.trim() ? "" : "Username is required";

            case "email":
                if (!value.trim()) {
                    return "Email is required";
                }

                const emailRegex =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                return emailRegex.test(value)
                    ? ""
                    : "Invalid Email";

            case "password":
                if (!value.trim()) {
                    return "Password is required";
                }

                return value.length >= 6
                    ? ""
                    : "Password must be at least 6 characters";

            default:
                return "";
        }
    };

    // Handle Input Change
    const handleForm = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        const errorMessage = validateField(name, value);

        setErrors((prev) => ({
            ...prev,
            [name]: errorMessage,
        }));
    };

    // Validate Entire Form
    const validateForm = () => {
        let newErrors = {};

        Object.keys(form).forEach((key) => {
            const errorMessage = validateField(key, form[key]);

            if (errorMessage) {
                newErrors[key] = errorMessage;
            }
        });

        return newErrors;
    };

    // Submit Form
    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validateForm();

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            console.log("Form Submitted Successfully");
            console.log(form);

            
        }
    };

    return (
        <form onSubmit={handleSubmit}>

            <input
                type="text"
                placeholder="First Name"
                name="firstName"
                value={form.firstName}
                onChange={handleForm}
            />
            {errors.firstName && <p>{errors.firstName}</p>}

            <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={form.lastName}
                onChange={handleForm}
            />
            {errors.lastName && <p>{errors.lastName}</p>}

            <input
                type="text"
                placeholder="Age"
                name="age"
                value={form.age}
                onChange={handleForm}
            />
            {errors.age && <p>{errors.age}</p>}

            <input
                type="text"
                placeholder="Username"
                name="username"
                value={form.username}
                onChange={handleForm}
            />
            {errors.username && <p>{errors.username}</p>}

            <input
                type="email"
                placeholder="Email"
                name="email"
                value={form.email}
                onChange={handleForm}
            />
            {errors.email && <p>{errors.email}</p>}

            <input
                type="password"
                placeholder="Password"
                name="password"
                value={form.password}
                onChange={handleForm}
            />
            {errors.password && <p>{errors.password}</p>}

            <button type="submit">
                Submit
            </button>

        </form>
    );
}

export default Form;