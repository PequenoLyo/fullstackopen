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

const setNotification = (notification) => {
  return {
    type: "notification/setNotification",
    payload: notification,
  };
};

export const newNotification = (notification, delay) => {
  return async (dispatch) => {
    dispatch(setNotification(notification))
    setTimeout(function() { dispatch(setNotification(null)) }, delay * 1000)
  }  
};

export default notificationSlice.reducer;
