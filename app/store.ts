import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice";
import { userSlice } from "./slices/userSlice";
import { userApi } from "./services/userApi";
import { authApi } from "./services/authApi";
export type RootState = ReturnType<typeof store.getState>;
export type Store = ReturnType<typeof store.getState>;

const allReducers = combineReducers({
  auth: authSlice.reducer,
  user: userSlice.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
});

const store = configureStore({
  reducer: allReducers,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, authApi.middleware),
    devTools: true,
},
);

export default store;
