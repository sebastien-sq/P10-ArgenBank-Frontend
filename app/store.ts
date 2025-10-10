import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice";

export type Store = ReturnType<typeof store.getState>;
const allReducers = combineReducers({
  auth: authSlice.reducer,
});

const store = configureStore({
  reducer: allReducers,
  devTools: true,
});

export default store;
