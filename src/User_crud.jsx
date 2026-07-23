import React, { useEffect, useState } from "react";

import { getUsers,createUser, updateUser, deleteUser } from "./services/userService";

function User_crud() {
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({name: "",email: ""});
    const [editId, setEditId] = useState(null);
    const [loading, setLoading] = useState(false);
    // ---------------------
    // READ USERS
    // ---------------------

    const fetchUsers = async () => {
    try {
            setLoading(true);
            const response = await getUsers();
            setUsers(response.data);
        }
        catch (error) {
            console.log(error);
         }
        finally {
            setLoading(false);

        }

    };

    useEffect(() => {

        fetchUsers();

    }, []);

// ---------------------
// HANDLE INPUT
// // ---------------------

    const handleChange = (e) => {
     const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
             [name]: value

        }));

    };
    // ---------------------
    // CREATE USER
    // ---------------------

    const handleAdd = async () => {
        try {
             const response = await createUser(form);
             setUsers((prev) => [
             ...prev,
            response.data

            ]);
                setForm({
                name: "",
                email: ""
            });

        }
        catch (error) {
             console.log(error);
            }
         };
    // ---------------------
    // EDIT CLICK
    // ---------------------


    const handleEdit = (user) => {
            setEditId(user.id);
            setForm({
                name: user.name,
                email: user.email
            });
        };

     // ---------------------
    // UPDATE USER
    // ---------------------


    const handleUpdate = async () => {
        try {
            const response = await updateUser(editId,form);
            const updatedUsers = users.map((user) => user.id === editId ? response.data : user);
            setUsers(updatedUsers);
            setEditId(null);
            setForm({
                name: "",
                email: ""
            });
        }
        catch (error) {
            console.log(error);
        }
    };
    // ---------------------
    // DELETE USER
    // ---------------------

    const handleDelete = async (id) => {
        try {
            await deleteUser(id);
            const filteredUsers = users.filter( (user) => user.id !== id);
             setUsers(filteredUsers);
            }
        catch (error) {
            console.log(error);
        }
    };

    return (
    <>
    <h1>User CRUD Application</h1>
     <input type="text"  name="name"  placeholder="Enter Name" value={form.name} onChange={handleChange}/>
    <input type="email" name="email" placeholder="Enter Email" value={form.email} onChange={handleChange}/>
    {editId ? <button onClick={handleUpdate}> Update </button> : <button onClick={handleAdd}> Add User</button>}
    {loading && <h3>Loading...</h3>}

    {users.map((user) => (
                    <div key={user.id}>
                        <h3>{user.name}</h3>
                        <p>{user.email}</p>
                            <button onClick={() => handleEdit(user)}>Edit</button>
                            <button onClick={() => handleDelete(user.id)}>Delete</button>
                        </div>
                    ))
     }
     </>
 )}
export default User_crud;