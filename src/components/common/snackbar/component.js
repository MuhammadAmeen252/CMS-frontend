import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { closeNotificationMessage } from "../../../redux/slices/snackbarSlice";
import { useDispatch, useSelector } from "react-redux";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function MySnackbar() {
  const { isOpenSnackbar, message, type } = useSelector(
    (state) => state.snackbar
  );
  const dispatch = useDispatch();
  const vertical = "top";
  const horizontal = "right";

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(closeNotificationMessage());
  };

  return (
    <div>
      {isOpenSnackbar && type && message && (
        <Snackbar
          open={isOpenSnackbar}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical, horizontal }}
        >
          <Alert
            onClose={handleClose}
            severity={type}
            sx={{ width: "100%", color: "white" }}
          >
            {message}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
}
