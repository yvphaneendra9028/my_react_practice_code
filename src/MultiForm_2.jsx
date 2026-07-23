import React from "react";

function MultiForm_2({ form, handleChange }) {

    return (

        <>

            <h2>Step 2</h2>

            <input
                type="text"
                placeholder="Address"
                name="address"
                value={form.address}
                onChange={handleChange}
            />

            <br /><br />

            <input
                type="text"
                placeholder="Company"
                name="company"
                value={form.company}
                onChange={handleChange}
            />

            <br /><br />

            <input
                type="text"
                placeholder="Role"
                name="roleInCompany"
                value={form.roleInCompany}
                onChange={handleChange}
            />

        </>

    );

}

export default MultiForm_2;