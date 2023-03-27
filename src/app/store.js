import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/auth/user";
import transactionReducer from "../features/auth/transactionSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    userInfo: userReducer,
    transactionsInfo: transactionReducer,
  },
});
