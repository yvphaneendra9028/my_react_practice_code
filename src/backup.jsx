import React, { useState } from "react";

export function FormCode() {
    const [error, setError] = useState({});

    const [form, setForm] = useState({
        productName: "",
        productCode: "",
        productDescription: "",
        productDiscount: "",
    });

    // Handle Input Fields
    const handleFormFields = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Remove error while typing
        setError((prev) => {
            const newErrors = { ...prev };
            delete newErrors[name];
            return newErrors;
        });
    };

    // Validate Form
    const validateForm = () => {
        let newErrors = {};

        if (!form.productName.trim()) {
            newErrors.productName = "Product Name is required";
        }

        if (!form.productCode.trim()) {
            newErrors.productCode = "Product Code is required";
        }

        if (!form.productDescription.trim()) {
            newErrors.productDescription =
                "Product Description is required";
        }

        if (!form.productDiscount.trim()) {
            newErrors.productDiscount =
                "Product Discount is required";
        }

        setError(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    // Submit Form
    const productSubmit = async (e) => {
        e.preventDefault();

        const isValid = validateForm();

        if (!isValid) return;

        console.log("Form Submitted Successfully");
        console.log(form);
    };

    return (
        <>
            <form onSubmit={productSubmit}>

                <input
                    type="text"
                    placeholder="Product Name"
                    name="productName"
                    value={form.productName}
                    onChange={handleFormFields}
                />
                {error.productName && <p>{error.productName}</p>}

                <input
                    type="text"
                    placeholder="Product Code"
                    name="productCode"
                    value={form.productCode}
                    onChange={handleFormFields}
                />
                {error.productCode && <p>{error.productCode}</p>}

                <input
                    type="text"
                    placeholder="Product Description"
                    name="productDescription"
                    value={form.productDescription}
                    onChange={handleFormFields}
                />
                {error.productDescription && (
                    <p>{error.productDescription}</p>
                )}

                <input
                    type="text"
                    placeholder="Product Discount"
                    name="productDiscount"
                    value={form.productDiscount}
                    onChange={handleFormFields}
                />
                {error.productDiscount && (
                    <p>{error.productDiscount}</p>
                )}

                <button type="submit">
                    Submit
                </button>

            </form>
        </>
    );
}

export default FormCode;