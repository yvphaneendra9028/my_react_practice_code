import axiosInstance from "../axios/axiosInstance";
// GET USERS
export const getUsers = () => {
    return axiosInstance.get("/users");
};
// CREATE USER
export const createUser = (userData)=>{
    return axiosInstance.post("/users",userData);
};
// UPDATE USER
export const updateUser = (id,userData)=>{
    return axiosInstance.put(`/users/${id}`,userData);

};
// DELETE USER
export const deleteUser = (id)=>{
    return axiosInstance.delete(`/users/${id}`);

};