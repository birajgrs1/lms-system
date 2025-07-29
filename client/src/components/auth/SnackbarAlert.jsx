import { useDispatch, useSelector } from "react-redux";
import { Snackbar, Alert } from "@mui/material";
import { clearMessage } from "../../features/auth/authSlice";

const SnackbarAlert = () => {
  const { message, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(clearMessage());
  };

  return (
    <Snackbar open={!!message || !!error} autoHideDuration={4000} onClose={handleClose}>
      <Alert severity={error ? "error" : "success"} onClose={handleClose}>
        {error || message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarAlert;