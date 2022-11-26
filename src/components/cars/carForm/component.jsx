import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import messages from "../../../locales/en";
import { useDispatch, useSelector } from "react-redux";
import { Divider, InputAdornment, MenuItem, Select } from "@mui/material";
import { getAllCategories } from "../../../redux/slices/carCategorySlice";
import { showNotificationMessage } from "../../../redux/slices/snackbarSlice";
import { addCar, editCar, setCars } from "../../../redux/slices/carSlice";

export default function AddEditCar(props) {
  const dispatch = useDispatch();
  const { carData } = props;
  const { user: currentUser } = useSelector((state) => state.auth);
  const { cars } = useSelector((state) => state.cars);
  const userToken = currentUser?.token;
  const [carCategories, setCarCategories] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [carDetails, setCarDetails] = useState({
    company: carData?.company ? carData?.company : "",
    name: carData?.name ? carData?.name : "",
    color: carData?.color ? carData?.color : "",
    model: carData?.model ? carData?.model : "",
    registrationYear: carData?.registrationYear
      ? carData?.registrationYear
      : "",
    registrationNumber: carData?.registrationNumber
      ? carData?.registrationNumber
      : "",
    engineNumber: carData?.engineNumber ? carData?.engineNumber : "",
    category: carData?.category ? carData?.category : "",
    topSpeed: carData?.topSpeed ? carData?.topSpeed : "",
  });

  useEffect(() => {
    dispatch(getAllCategories(userToken))
      .unwrap()
      .then((res) => {
        if (!res) {
          return dispatch(
            showNotificationMessage({
              message: messages.invlidRes,
              type: "error",
            })
          );
        }
        const categoriesNames = [];
        res.forEach((item) => {
          categoriesNames.push(item.name);
        });
        setCarCategories(categoriesNames);
      })
      .catch((error) => {
        return false;
      });
  }, []);

  const clearFormData = () => {
    setCarDetails({
      company: "",
      name: "",
      color: "",
      model: "",
      registrationYear: "",
      registrationNumber: "",
      engineNumber: "",
      category: "",
      topSpeed: "",
    });
    setIsSubmitted(false)
  };
  const handleAddCar = () => {
    const { company, name, color, model, engineNumber, category } = carDetails;
    setIsSubmitted(true);
    if (carDetails.model > carDetails.registrationYear) {
      return dispatch(
        showNotificationMessage({
          message: messages.modelGreaterError,
          type: "error",
        })
      );
    }
    if (!company || !name || !color || !model || !engineNumber || !category) {
      return false;
    }
    const payload = { ...carDetails };
    dispatch(addCar({ userToken, payload }))
      .unwrap()
      .then((res) => {
        if (!res) {
          return dispatch(
            showNotificationMessage({
              message: messages.invlidRes,
              type: "error",
            })
          );
        }
        dispatch(
          showNotificationMessage({
            message: messages.carAdded,
            type: "success",
          })
        );
        const car = res?.data?.car;
        dispatch(setCars([...cars, car]));
        clearFormData()
      })
      .catch((error) => {
        return dispatch(
          showNotificationMessage({ message: error, type: "error" })
        );
      });
  };

  const handleEditCar = () => {
    const { company, name, color, model, engineNumber, category } = carDetails;
    setIsSubmitted(true);
    if (carDetails.model > carDetails.registrationYear) {
      return dispatch(
        showNotificationMessage({
          message: messages.modelGreaterError,
          type: "error",
        })
      );
    }
    if (!company || !name || !color || !model || !engineNumber || !category) {
      return false;
    }
    const payload = { ...carDetails };
    dispatch(editCar({ userToken, payload, id: carData?._id }))
      .unwrap()
      .then((res) => {
        if (!res) {
          return dispatch(
            showNotificationMessage({
              message: messages.invlidRes,
              type: "error",
            })
          );
        }
        dispatch(
          showNotificationMessage({
            message: messages.editedCarMsg,
            type: "success",
          })
        );
        const car = res?.data?.car;
        let carsList = cars;
        carsList = carsList.map((x) => (x._id === car._id ? car : x));
        console.log("carsList", carsList);
        dispatch(setCars([...carsList]));
      })
      .catch((error) => {
        return dispatch(
          showNotificationMessage({ message: error, type: "error" })
        );
      });
  };

  const handleCarDetailsChange = (item) => {
    setCarDetails({ ...carDetails, ...item });
  };

  return (
    <Grid>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h3"
          sx={{ display: carData && "none" }}
          gutterBottom
        >
          Add Car Details
        </Typography>
        <Divider
          style={{
            borderBottom: "1px solid #e5e5e5",
            display: carData && "none",
          }}
        />
        <Box sx={{ mt: 3, width: "50%" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="company"
                label="Company name"
                value={carDetails?.company}
                onChange={(e) => {
                  handleCarDetailsChange({ company: e.target.value });
                }}
                error={isSubmitted && !carDetails.company}
                helperText={
                  isSubmitted && !carDetails.company && messages.emptyFieldError
                }
                name="company name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="name"
                label="Car name"
                value={carDetails?.name}
                onChange={(e) => {
                  handleCarDetailsChange({ name: e.target.value });
                }}
                error={isSubmitted && !carDetails.name}
                helperText={
                  isSubmitted && !carDetails.name && messages.emptyFieldError
                }
                name="name"
              />
            </Grid>
            <Grid item xs={12}>
              <Select
                variant="outlined"
                margin="dense"
                required
                fullWidth
                style={{ marginTop: 8 }}
                defaultValue={
                  carDetails.category ? carDetails.category : "DEFAULT"
                }
                value={carDetails.category ? carDetails.category : "DEFAULT"}
                onChange={(e) => {
                  handleCarDetailsChange({ category: e.target.value });
                }}
                error={isSubmitted && !carDetails.category}
              >
                <MenuItem
                  value={carDetails.category ? carDetails.category : "DEFAULT"}
                  disabled
                >
                  {carDetails.category
                    ? carDetails.category
                    : "Choose a car Category"}
                </MenuItem>
                {carCategories.map((el, index) => (
                  <MenuItem value={el} key={index}>
                    {el}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="model"
                type="number"
                label="Car manufacturing year"
                value={carDetails?.model}
                onChange={(e) => {
                  handleCarDetailsChange({ model: e.target.value });
                }}
                error={isSubmitted && !carDetails.model ? true : false}
                helperText={
                  isSubmitted && !carDetails.model && messages.emptyFieldError
                }
                name="model"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="regNumber"
                label="Registration number"
                value={carDetails?.registrationNumber}
                onChange={(e) => {
                  handleCarDetailsChange({
                    registrationNumber: e.target.value,
                  });
                }}
                name="regNumber"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="regYear"
                label="Registration year"
                type="number"
                value={carDetails?.registrationYear}
                onChange={(e) => {
                  handleCarDetailsChange({ registrationYear: e.target.value });
                }}
                error={false}
                helperText={false}
                name="regYear"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                id="engineNum"
                label="Engine number"
                value={carDetails?.engineNumber}
                onChange={(e) => {
                  handleCarDetailsChange({ engineNumber: e.target.value });
                }}
                error={isSubmitted && !carDetails.engineNumber}
                helperText={
                  isSubmitted &&
                  !carDetails.engineNumber &&
                  messages.emptyFieldError
                }
                name="engNumber"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                id="color"
                label="Color"
                value={carDetails?.color}
                onChange={(e) => {
                  handleCarDetailsChange({ color: e.target.value });
                }}
                error={isSubmitted && !carDetails.color}
                helperText={
                  isSubmitted && !carDetails.color && messages.emptyFieldError
                }
                name="color"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="topSpeed"
                label="Top Speed"
                value={carDetails?.topSpeed}
                onChange={(e) => {
                  handleCarDetailsChange({ topSpeed: e.target.value });
                }}
                InputProps={{
                  endAdornment: <InputAdornment position="start">km/h</InputAdornment>,
                }}
                error={false}
                helperText={false}
                name="topSpeed"
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => {
              if (!carData) handleAddCar();
              else handleEditCar();
            }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Grid>
  );
}
