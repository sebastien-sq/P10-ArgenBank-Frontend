import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice";
import { userSlice } from "./slices/userSlice";
export type RootState = ReturnType<typeof store.getState>;
export type Store = ReturnType<typeof store.getState>;
const allReducers = combineReducers({
  auth: authSlice.reducer,
  user: userSlice.reducer,
});

const store = configureStore({
  reducer: allReducers,
  devTools: true,
});

export default store;
