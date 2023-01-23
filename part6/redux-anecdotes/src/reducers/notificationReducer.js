import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    createNotification(state, action) {      
      return action.payload;
    },
  },
});

export const newNotification = (notification) => {
  return {
    type: "notification/createNotification",
    payload: notification,
  };
};

export const { createNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
