import React, { useState } from "react";
import MultiForm_1 from "./MultiForm_1";
import MultiForm_2 from "./MultiForm_2";

function MultiStepForm() {

    const [form, setForm] = useState({
        name: "",
        age: "",
        mobile: "",
        address: "",
        company: "",
        roleInCompany: ""
    });

    const [step, setStep] = useState(1);


    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value
        }));

    };


   const nextStep = () => {
    console.log("Next Clicked");
    setStep((prev) => prev + 1);
};

const prevStep = () => {
    console.log("Previous Clicked");
    setStep((prev) => prev - 1);
};

const handleSubmit = (e) => {
    e.preventDefault();
    alert("submit clicked")
    console.log("Submit Clicked",form);
};


    return (
            <>
            <h3>Multi Step Form</h3>
        <form onSubmit={handleSubmit}>

            {
                step === 1 &&
                <MultiForm_1
                    form={form}
                    handleChange={handleChange}
                />
            }


            {
                step === 2 &&
                <MultiForm_2
                    form={form}
                    handleChange={handleChange}
                />
            }


            <br />

            {
                step > 1 &&
                <input
    type="button"
    value="Previous"
    onClick={prevStep}
/>
            }


            {
                step < 2
                    ?
                   <input
    type="button"
    value="Next"
    onClick={nextStep}
/>

                    :

                    <button type="submit" >submit</button>
                    
                    
            }

        </form>
        </>

    );

}

export default MultiStepForm;