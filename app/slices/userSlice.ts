import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (token: string) => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to fetch user profile");
      }
      const data = await response.json();
      return data.body;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }
);
export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async ({firstName, lastName, token}:{firstName : string, lastName : string, token : string}) => {
    try {
      if (!token) {
        throw new Error("No token found");
      }
      const response = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ firstName, lastName }),
        }
      );
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to fetch user profile");
      }
      const data = await response.json();
      return data.body;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }
);
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = "LOADING";
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = "SUCCEEDED";
        state.id = action.payload.id;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.email = action.payload.email;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = "FAILED";
        state.error = action.error.message || "Failed to fetch user profile";
      });
  builder
  .addCase(updateUserProfile.pending, (state) => {
    state.status = "LOADING";
    state.error = null;
  } 
  )
  .addCase(updateUserProfile.fulfilled, (state, action) => {
    state.status = "SUCCEEDED"; 
    state.firstName = action.payload.firstName;
    state.lastName = action.payload.lastName;
  } 
  )
  .addCase(updateUserProfile.rejected, (state, action) => {
    state.status = "FAILED";
    state.error = action.error.message || "Failed to update user profile";
  } 
  );  
}
});
