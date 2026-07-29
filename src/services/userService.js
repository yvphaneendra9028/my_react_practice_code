import api  from "../axios/api_global"
import apiAxios  from "../axios/axiosInstance";
// GET USERS
export const getUsers = () => {
    return api.get("/users");
};
// CREATE USER
export const createUser = (userData)=>{
    return api.post("/users",userData);
};


// UPDATE USER
export const updateUser = (id,userData)=>{
    return api.put(`/users/${id}`,userData);

};
// DELETE USER
export const deleteUser = (id)=>{
    return api.delete(`/users/${id}`);

};

export const registerUser = (userData) => {
    return apiAxios.post("/users/register", userData);
};
export const loginUser = (userData) => {
    return apiAxios.post("/users/login", userData);
};