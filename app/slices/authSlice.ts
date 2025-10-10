import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserProfile } from "./userSlice";


export type credentialsType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

// Check si localStorage est disponible (sinon problème hydration avec le SSR)
const hasLocalStorage =
  typeof window !== "undefined" && typeof window.localStorage !== "undefined";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    { email, password, rememberMe }: {
      email: string;
      password: string;
      rememberMe: boolean;
    }, 
    { dispatch }  
  ) => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to login");
      }

      const data = await response.json();
      const token = data.body.token;

      if (rememberMe && hasLocalStorage) {
        window.localStorage.setItem("token", token);
      }

      await dispatch(fetchUserProfile(token));
      
      return token;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }
);
export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async ({
    firstName,
    lastName,
    email,
    password,
  }: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to sign up");
      }

      const data = await response.json();
      const token = data.body.token;

      if (hasLocalStorage) {
        window.localStorage.setItem("token", token);
      }

      return token;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }
);

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
  extraReducers: (builder) => {
    // Login user
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "LOADING";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "SUCCEEDED";
        state.token = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "FAILED";
        state.error = action.error.message || "Failed to login";
        state.isAuthenticated = false;
        state.token = null;
      });

    // Sign up user
    builder
      .addCase(signUpUser.pending, (state) => {
        state.status = "LOADING";
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.status = "SUCCEEDED";
        state.token = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.status = "FAILED";
        state.error = action.error.message || "Failed to sign up";
        state.isAuthenticated = false;
        state.token = null;
      });
  },
});

export const { logout, loginFailed } = authSlice.actions;
