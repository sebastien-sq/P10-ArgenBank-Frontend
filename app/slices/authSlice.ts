import { createSlice } from "@reduxjs/toolkit";

export type credentialsType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

// Check si localStorage est disponible (sinon problème hydration avec le SSR)
const hasLocalStorage =
  typeof window !== "undefined" && typeof window.localStorage !== "undefined";


export const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    status: "IDLE" as "IDLE" | "LOADING" | "SUCCEEDED" | "FAILED",
    error: null as string | null,
    token: hasLocalStorage ? window.localStorage.getItem("token") : null,
    isAuthenticated: hasLocalStorage
      ? !!window.localStorage.getItem("token")
      : false,
  },
  reducers: {
    setCredentials: (state, action) => {
      state.status = "SUCCEEDED";
      state.error = null;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.status = "IDLE";
      state.error = null;
      state.isAuthenticated = false;
      if (hasLocalStorage && localStorage.getItem("token")) {
        localStorage.removeItem("token");
      }
      state.token = null;
    },
    loginFailed: (state, action) => {
      state.status = "FAILED";
      state.error = action.payload;
      state.isAuthenticated = false;
      state.token = null;
    },
  },
});

export const { logout, loginFailed, setCredentials } = authSlice.actions;
