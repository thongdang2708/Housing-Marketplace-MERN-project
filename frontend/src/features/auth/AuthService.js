
import axios from "axios";

const API_URL = "/api/users/";

//Register Function

const register = async (inputData) => {

    let response = await axios.post(API_URL, inputData);

    return response.data;
};

//Login Function

const login = async (inputData) => {

    let response = await axios.post(API_URL + "login", inputData);

    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    };

    return response.data;
};

//Logout Function

const logout = () => localStorage.removeItem("user");

//Forget Password

const forgetPassword = async (inputData) => {

    let response = await axios.post(API_URL + "setResetPassword", inputData);

    return response.data;
};


//Reset password

const resetPassword = async (resetToken, inputData) => {

    let response = await axios.put(API_URL + resetToken, inputData);

    return response.data;
};

//Update user details

const updateUser = async (inputData, token) => {

    let config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    };

    let response = await axios.put(API_URL + "update", inputData, config);

    return response.data;
};

//Update password

const updatePassword = async(inputData, token) => {

    let config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    };

    let response = await axios.post(API_URL + "updatePassword", inputData, config);

    return response.data;
};

//Get All Users

const getAllUsers = async () => {

    let response = await axios.get(API_URL + "all");

    return response.data;
};



const AuthService = {
    register,
    login,
    logout,
    forgetPassword,
    resetPassword,
    updateUser,
    updatePassword,
    getAllUsers
};

export default AuthService;