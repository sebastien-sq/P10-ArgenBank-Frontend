import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    id: null as number | null,
    firstName: null as string | null,
    lastName: null as string | null,
    email: null as string | null,
    status: "IDLE" as "IDLE" | "LOADING" | "SUCCEEDED" | "FAILED",
    error: null as string | null,
  },
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
    },
    clearUser: (state) => {
      state.id = null;
      state.firstName = null;
      state.lastName = null;
      state.email = null;
      state.status = "IDLE";
      state.error = null;
    },
  },

});

export const { setUser, clearUser } = userSlice.actions;