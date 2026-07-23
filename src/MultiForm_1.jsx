import React from "react";

function MultiForm_1({ form, handleChange }) {

    return (

        <>

            <h2>Step 1</h2>

            <input
                type="text"
                placeholder="Name"
                name="name"
                value={form.name}
                onChange={handleChange}
            />

            <br /><br />

            <input
                type="text"
                placeholder="Age"
                name="age"
                value={form.age}
                onChange={handleChange}
            />

            <br /><br />

            <input
                type="text"
                placeholder="Mobile"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
            />

        </>

    );

}

export default MultiForm_1;