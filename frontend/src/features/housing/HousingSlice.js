
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import HousingService from "./HousingService";

const initialState = {
    housings: [],
    housing: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
};

//Add housing ads with authorization

export const createHousing = createAsyncThunk("/housing/addHousing",
        async (user, thunkAPI) => {

            try {

                let token = thunkAPI.getState().auth.user.token;

                return await HousingService.addHousing(user, token);

            } catch (error) {

                let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

                return thunkAPI.rejectWithValue(message);

            }
        }
);

//Display housings ads with authorization

export const displayForHousing = createAsyncThunk("/housing/displayHousing",
        async (user, thunkAPI) => {
            try {

                let token = thunkAPI.getState().auth.user.token;

                return await HousingService.displayHousing(token);

            } catch (error) {

                let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

                return thunkAPI.rejectWithValue(message);
            }   
        }
);

//Delete housing ads with authorization

export const deleteForHousing = createAsyncThunk("/housing/deleteHousing", 
        async (user, thunkAPI) => {

            try {

                let token = thunkAPI.getState().auth.user.token;

                return await HousingService.deleteHousing(user, token);
                

            } catch (error)  {

                let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

                return thunkAPI.rejectWithValue(message);
            }
        }
);

//Display top five latest housing ads

export const displayForTopFive = createAsyncThunk("/housing/topfive",
        async (user, thunkAPI) => {

            try {

                return await HousingService.displayTopFive();

            } catch (error) {

                let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

                return thunkAPI.rejectWithValue(message);
            }
        }
);

//Display rent housing ads

export const displayForRent = createAsyncThunk("/housing/displayRent",
        async (user, thunkAPI) => {

            try {

                return await HousingService.displayRent();

            } catch (error) {

                let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

                return thunkAPI.rejectWithValue(message);
            }
        }
);

//Display sell housing ads

export const displayForSell = createAsyncThunk("/housing/displaySell", 
        async (user, thunkAPI) => {

            try {

                return await HousingService.displaySell();

            } catch (error) {

                let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

                return thunkAPI.rejectWithValue(message);
            }
        }
);

//Display housing ads with offers

export const displayForOffers = createAsyncThunk("/housing/displayOffer",

        async (user, thunkAPI) => {

            try {

                return await HousingService.displayOffer();

            } catch (error) {

                let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

                return thunkAPI.rejectWithValue(message);
            }
        }
);



//Get full housing ads with public

export const getForFull = createAsyncThunk("/housing/getFull",

        async (user, thunkAPI) => {

            try {

                return await HousingService.getFull();

            } catch (error) {
                let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

                return thunkAPI.rejectWithValue(message);
            }
        }
    
)


export const HousingSlice = createSlice({
    name: "housing",
    initialState,
    reducers: {
        resetFunctionForHousing: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createHousing.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(createHousing.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true
            })
            .addCase(createHousing.rejected, (state, action) => {
                state.isLoading = false;
                state.message = action.payload;
                state.isError = true;
            })
            .addCase(displayForHousing.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(displayForHousing.fulfilled, (state, action) => {
                state.isLoading = false;
                state.housings = action.payload;
            })
            .addCase(displayForHousing.rejected, (state, action) => {
                state.isLoading = false;
                state.message = action.payload;
                state.isError = true
            })
            .addCase(deleteForHousing.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(deleteForHousing.fulfilled, (state, action) => {
                state.isLoading = false;
                state.housings = state.housings.filter((housing) => housing._id !== action.payload._id);
            })
            .addCase(deleteForHousing.rejected, (state, action) => {
                state.isError = true;
                state.message = action.payload;
                state.isLoading = false;
            })
            .addCase(displayForTopFive.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(displayForTopFive.fulfilled, (state, action) => {
                state.isLoading = false;
                state.housings = action.payload;
            })
            .addCase(displayForTopFive.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(displayForRent.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(displayForRent.fulfilled, (state, action) => {
                state.isLoading = false;
                state.housings = action.payload
            })
            .addCase(displayForRent.rejected, (state, action) => {
                state.isLoading = false;
                state.message = action.payload;
                state.isError = true;
            })
            .addCase(displayForSell.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(displayForSell.fulfilled, (state, action) => {
                state.isLoading = false;
                state.housings = action.payload
            })
            .addCase(displayForSell.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(displayForOffers.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(displayForOffers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.housings = action.payload
            })
            .addCase(displayForOffers.rejected, (state, action) => {
                state.isError = true;
                state.message = action.payload;
                state.isLoading = false;
            })
            .addCase(getForFull.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getForFull.fulfilled, (state, action) => {
                state.isLoading = false;
                state.housings = action.payload
            })
            .addCase(getForFull.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
           
    }
});


export const {resetFunctionForHousing} = HousingSlice.actions;

export default HousingSlice.reducer;