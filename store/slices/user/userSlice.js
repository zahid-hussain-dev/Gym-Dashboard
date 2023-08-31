import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    showDropdown: false,
    loginData:{},
    userId:"",
    showCollapse:true,
    coachName:"",
    gymName:"",
    gymnastName:"",
    getRequest: false,
    gymId:"",

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
    setGymName(state, action) {
      state.gymName = action.payload;
    },
    setGymnastName(state, action) {
      state.gymnastName = action.payload;
    },
    setGetRequest(state, action) {
      state.getRequest = action.payload;
    },
    setGymId(state, action) {
      state.gymId = action.payload;
    },
  },
});

export const { setshowDropdown,setloginData,setuserId,setShowCollapse,setCoachName,setGymName,setGymnastName,setGetRequest,setGymId } = userSlice.actions;

export default userSlice.reducer;