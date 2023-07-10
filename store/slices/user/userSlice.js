import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    showDropdown: false,
    loginData:{},
    userId:"",

  },
  reducers: {
    setshowDropdown(state, action) {
      state.showDropdown = action.payload;
    },
    setloginData(state, action) {
      state.loginData = action.payload;
    },
    setuserId(state, action) {
      state.userId = action.payload;
    },

  },
});

export const { setshowDropdown,setloginData,setuserId } = userSlice.actions;

export default userSlice.reducer;