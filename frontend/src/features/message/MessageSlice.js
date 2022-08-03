
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import MessageService from "./MessageService";

const initialState = {
    isLoadingForMessage: false,
    isErrorForMessage: false,
    isSuccessForMessage: false,
    messageForMessage: ""
};

//Add Message

export const addForMessage = createAsyncThunk("/message/addMessage",
        async (user, thunkAPI) => {
            
            try {

                return await MessageService.addMessage(user);
            } catch (error) {

                let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

                return thunkAPI.rejectWithValue(message);
            }
        }
);



export const MessageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        resetFunctionForMessage: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(addForMessage.pending, (state, action) => {
                state.isLoadingForMessage = true
            })
            .addCase(addForMessage.fulfilled, (state, action) => {
                state.isLoadingForMessage = false;
                state.isSuccessForMessage = true;
                state.messageForMessage = action.payload.message
            })
            .addCase(addForMessage.rejected, (state, action) => {
                state.isLoadingForMessage = false;
                state.isErrorForMessage = true;
                state.messageForMessage = action.payload;
            })
    }
});

export const {resetFunctionForMessage} = MessageSlice.actions;

export default MessageSlice.reducer;






