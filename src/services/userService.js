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

export const addProduct = (productData) => {
    return apiAxios.post("/products/addProduct", productData);
}
export const getProduct = ()=> {
    return apiAxios.get('/products/getAllProducts');
}

export const addPlan = (planData) => {
    return apiAxios.post("/plans/addPlan", planData);
}

export const getPlansByProduct = async (productId) => {
    try {
        const response = await apiAxios.get(
            `/plans/product/${productId}`
        );

        return response.data;

    } catch (error) {
        console.error("Get Plans By Product Error:", error);

        throw error;
    }
};

