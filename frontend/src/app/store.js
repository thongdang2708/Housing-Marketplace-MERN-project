import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from "../features/auth/AuthSlice";
import HousingReducer from "../features/housing/HousingSlice";
import MessageReducer from "../features/message/MessageSlice";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    housing: HousingReducer,
    message: MessageReducer
  },
});
