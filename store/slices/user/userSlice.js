import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    showDropdown: false,
    loginData:{},
    userId:"",
    showCollapse:true,
    coachName:"",

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
    setShowCollapse(state, action) {
      state.showCollapse = action.payload;
    },
    setCoachName(state, action) {
      state.coachName = action.payload;
    },

  },
});

export const { setshowDropdown,setloginData,setuserId,setShowCollapse,setCoachName } = userSlice.actions;

export default userSlice.reducer;