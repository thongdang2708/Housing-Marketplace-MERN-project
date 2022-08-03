
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import AuthService from "./AuthService";

let user = JSON.parse(localStorage.getItem("user"));
const initialState = {
    user: user ? user : null,
    editUser: {
        info: {},
        edit: false
    },
    users: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
};

//Register

export const registerUser = createAsyncThunk("/auth/register", 
    async (user, thunkAPI) => {

        try {

            return await AuthService.register(user);


        } catch (error) {

            let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

            return thunkAPI.rejectWithValue(message);

        }
    }
);


//Log In


export const loginUser = createAsyncThunk("/auth/login",
    async (user, thunkAPI) => {

        try {

            return await AuthService.login(user);


        } catch (error) {

            let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

//Log Out

export const logoutUser = createAsyncThunk("/auth/logout",
    async (user, thunkAPI) => {
        await AuthService.logout();
    }
);

//Forget Password

export const forgetPasswordForUser = createAsyncThunk("auth/forgetPassword",
    async (user, thunkAPI) => {

        try {
            return await AuthService.forgetPassword(user);
        } catch (error) {
            let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

            return thunkAPI.rejectWithValue(message);
        }
      
    }
);

//Reset password

export const resetForPassword = createAsyncThunk("/auth/resetPassword", 
        async (user, thunkAPI) => {

            try {

                return await AuthService.resetPassword(user.resetToken, user.inputData);
            } catch (error) {

                let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

                return thunkAPI.rejectWithValue(message);
            }
        }
);

//Select user information to edit

export const editInformation = createAsyncThunk("/auth/editInfo",
        async (user, thunkAPI) => {
            return {
                info: user,
                edit: true
            }
        }
);

//Update user details

export const updateUserDetails = createAsyncThunk("/auth/updateDetails",
        async (user, thunkAPI) => {

            try {
                let token = thunkAPI.getState().auth.user.token;

                return await AuthService.updateUser(user, token);
            } catch (error) {

                let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

                return thunkAPI.rejectWithValue(message);
            }
           
            
        }
);

//Update password

export const updateForPassword = createAsyncThunk("/auth/updatePassword",
        async (user, thunkAPI) => {

            try {

                let token = thunkAPI.getState().auth.user.token;

                return await AuthService.updatePassword(user, token);


            } catch (error) {

                let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

                return thunkAPI.rejectWithValue(message);
            }
        }
);

//Get All Users with no authorization

export const getForAll = createAsyncThunk("/auth/getForAll",
        async (user, thunkAPI) => {

            try {

                return await AuthService.getAllUsers();
            } catch (error) {   

                let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

                return thunkAPI.rejectWithValue(message);
            }
        }
);


export const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        resetFunction: (state) => initialState,
        resetForLogin: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = ""
        },
        resetEdit: (state) => {
            state.editUser = {
                info: {},
                edit: false
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(loginUser.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isSuccess = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.user = null;
            })
            .addCase(forgetPasswordForUser.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.message = action.payload.message;
            })
            .addCase(forgetPasswordForUser.rejected, (state, action) => {
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(resetForPassword.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.message = action.payload.message
            })
            .addCase(resetForPassword.rejected, (state, action) => {
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(editInformation.fulfilled, (state, action) => {
                state.editUser = action.payload
            })
            .addCase(updateUserDetails.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(updateUserDetails.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.isLoading = false;
                state.user = action.payload
            })
            .addCase(updateUserDetails.rejected, (state, action) => {
                state.isError = true;
                state.message = action.payload;
                state.isLoading = false;
            })
            .addCase(updateForPassword.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(updateForPassword.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.message
            })
            .addCase(updateForPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getForAll.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(getForAll.fulfilled, (state, action) => {
                state.isLoading = false
                state.users = action.payload
            })
            .addCase(getForAll.rejected, (state, action) => {
                state.isLoading = false;
                state.message = action.payload;
                state.isError = true;
            })
    }
});

export const {resetFunction, resetForLogin, resetEdit} = AuthSlice.actions;

export default AuthSlice.reducer;

