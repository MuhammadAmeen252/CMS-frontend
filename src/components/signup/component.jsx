import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import messages from "../../locales/en";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/slices/auth";
import { showNotificationMessage } from "../../redux/slices/snackbarSlice";

export default function Signup(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);
  const userToken = currentUser?.token;
  const NAME_MIN_LENGTH = 3;
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
  });
  function validateEmail(inputText) {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return inputText.match(mailformat);
  }

  const handleSubmit = () => {
    const { name, email } = signupData;
    if (!name && !email)
      return setErrors({
        ...errors,
        name: messages.nameRequired,
        email: messages.emailRequired,
      });
    if (!name) return setErrors({ ...errors, name: messages.nameRequired });
    if (!email) return setErrors({ ...errors, email: messages.emailRequired });
    if (!validateEmail(email))
      return setErrors({ ...errors, email: messages.emailInvalid });
    if (name.length < NAME_MIN_LENGTH)
      return setErrors({
        ...errors,
        name: messages.nameMinLength.replace("{0}", NAME_MIN_LENGTH),
      });

    dispatch(register(signupData))
      .unwrap()
      .then((res) => {
        if (!res?.data) {
          return dispatch(showNotificationMessage({message:  messages.invlidRes, type: "error"}));
        }
        console.log(
          "email: ",
          res.data.user.email,
          "password: ",
          res.data.password
        );
        dispatch(showNotificationMessage({message:  messages.sucessSignup, type: "success"}));
        navigate("/login");
      })
      .catch((error) => {
        return dispatch(showNotificationMessage({message:  error, type: "error"}));
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
          <LockOpenIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="name"
              label="Name"
              value={signupData.name}
              onChange={(e) => {
                const val = e.target.value;
                setSignupData({ ...signupData, name: val });
                if (val.trim() && errors.name === messages.nameRequired) {
                  setErrors({ ...errors, name: "" });
                }
                if (
                  val.trim().length >= NAME_MIN_LENGTH &&
                  errors.name ===
                    messages.nameMinLength.replace("{0}", NAME_MIN_LENGTH)
                ) {
                  setErrors({ ...errors, name: "" });
                }
              }}
              error={errors.name}
              helperText={errors.name}
              name="name"
              autoComplete="family-name"
            />
          </Grid>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            value={signupData.email}
            error={errors.email}
            helperText={errors.email}
            onChange={(e) => {
              const val = e.target.value;
              setSignupData({ ...signupData, email: val });
              if (val.trim() && errors.email === messages.emailRequired) {
                setErrors({ ...errors, email: "" });
              }
              if (
                validateEmail(val.trim()) &&
                errors.email === messages.emailInvalid
              ) {
                setErrors({ ...errors, email: "" });
              }
            }}
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
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
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
