import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import messages from "../../locales/en";
import { useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slices/auth";
import { showNotificationMessage } from "../../redux/slices/snackbarSlice";

export default function SignIn(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);
  const userToken = currentUser?.token
  const PASSWORD_MIN_LENGTH = 7;
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
  });
  function validateEmail(inputText) {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return inputText.match(mailformat);
  }
  const handleSubmit = () => {
    const { password, email } = userInput;
    if (!password && !email)
      return setErrors({
        ...errors,
        passwordError: messages.passwordRequired,
        emailError: messages.emailRequired,
      });
    if (!password)
      return setErrors({ ...errors, passwordError: messages.passwordRequired });
    if (!email)
      return setErrors({ ...errors, emailError: messages.emailRequired });
    if (!validateEmail(email))
      return setErrors({ ...errors, emailError: messages.emailInvalid });
    if (password.length < PASSWORD_MIN_LENGTH)
      return setErrors({
        ...errors,
        passwordError: messages.passwordMinLength.replace(
          "{0}",
          PASSWORD_MIN_LENGTH
        ),
      });
    dispatch(login(userInput))
      .unwrap()
      .then((res) => {
        if (!res) {
          return dispatch(showNotificationMessage({message:  messages.invlidRes, type: "error"}));
        }
        dispatch(showNotificationMessage({message:  messages.successLogin, type: "success"}));
        navigate("/");
      })
      .catch((error) => {
        return dispatch(showNotificationMessage({message: error, type: "error"}));
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      {userToken && <Navigate to="/" />}
      <Box
        sx={{
          marginTop: 11,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            value={userInput.email}
            error={errors.emailError}
            helperText={errors.emailError}
            onChange={(e) => {
              const val = e.target.value;
              setUserInput({ ...userInput, email: val });
              if (val.trim() && errors.emailError === messages.emailRequired) {
                setErrors({ ...errors, emailError: "" });
              }
              if (
                validateEmail(val) &&
                errors.emailError === messages.emailInvalid
              ) {
                setErrors({ ...errors, emailError: "" });
              }
            }}
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={userInput.password}
            onChange={(e) => {
              const val = e.target.value;
              setUserInput({ ...userInput, password: val });
              if (
                val.trim() &&
                errors.passwordError === messages.passwordRequired
              ) {
                setErrors({ ...errors, passwordError: "" });
              }
              if (
                val.trim().length >= PASSWORD_MIN_LENGTH &&
                errors.passwordError ===
                  messages.passwordMinLength.replace("{0}", PASSWORD_MIN_LENGTH)
              ) {
                setErrors({ ...errors, passwordError: "" });
              }
            }}
            error={errors.passwordError}
            helperText={errors.passwordError}
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="#" style={{ textDecoration: "none" }}>
                <Typography
                  variant="body2"
                  color="primary"
                >
                  {" "}
                  Forgot password?{" "}
                </Typography>
              </Link>
            </Grid>
            <Grid item>
              <Link to="/signup" style={{ textDecoration: "none" }}>
                <Typography
                  variant="body2"
                  color="primary"
                >
                  {"Don't have an account? Sign Up"}
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
