import { createSlice } from "@reduxjs/toolkit";

const initialState = "";
const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(state, action) {      
      return action.payload;
    },    
  },
});

export const { setNotification } = notificationSlice.actions

export const newNotification = (notification, delay) => {
  return async (dispatch) => {
    console.log(notification)
    dispatch(setNotification(notification))
    
    setTimeout(function() { dispatch(setNotification(null)) }, delay * 1000)
  }
};

export default notificationSlice.reducer;
