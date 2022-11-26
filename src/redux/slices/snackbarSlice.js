import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpenSnackbar: false,
  message: "",
  type: ""
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    showNotificationMessage: (state, action) => {
      const { message, type } = action.payload
      state.isOpenSnackbar = true;
      state.message = message;
      state.type = type
    },
    closeNotificationMessage: (state, action) => {
      state.isOpenSnackbar = false;
      state.message = ""
      state.type = ""
    },
  },
});

export const { showNotificationMessage, closeNotificationMessage } = snackbarSlice.actions;
const { reducer } = snackbarSlice;
export default reducer;
