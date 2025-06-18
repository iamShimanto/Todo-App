import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    value: JSON.parse(localStorage.getItem("userData")) || null,
  },
  reducers: {
    loggedUser: (state, action) => {
      state.value = action.payload;
      localStorage.setItem("userData", JSON.stringify(action.payload));
    },
  },
});

export const { loggedUser } = authSlice.actions;

export default authSlice.reducer;
