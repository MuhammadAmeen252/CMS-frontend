import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import messages from "../../../locales/en";
import { useDispatch, useSelector } from "react-redux";
import { Divider} from "@mui/material";
import { setCategories } from "../../../redux/slices/carCategorySlice";
import { showNotificationMessage } from "../../../redux/slices/snackbarSlice";
import {
  addCategory,
  editCategory,
} from "../../../redux/slices/carCategorySlice";
import {cleanObjectValues} from "../../service"

export default function CarCategoryForm(props) {
  const MIN_NAME_LENGTH = 3;
  const MAX_NAME_LENGTH = 30;
  const dispatch = useDispatch();
  const { categoryData } = props;
  const { user: currentUser } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.categories);
  const [errors, setErrors] = useState({
    name: "",
  });
  const userToken = currentUser?.token;
  const [categoryDetails, setCategoryDetails] = useState({
    name: categoryData?.name ? categoryData?.name : "",
    description: categoryData?.description ? categoryData?.description : "",
  });

  const clearForm = () => {
    setCategoryDetails({
      name:"",
      description:""
    })
  }

  const isCorrectAllFields = () => {
    const { name } = categoryDetails;
    const categoryNameLength = name.length;
    if (
      categoryNameLength < MIN_NAME_LENGTH ||
      categoryNameLength > MAX_NAME_LENGTH
    ) {
      const errMsg = messages.categoryNameLength
        .replace("{0}", MIN_NAME_LENGTH)
        .replace("{1}", MAX_NAME_LENGTH);
      setErrors({ ...errors, name: errMsg });
      return false;
    }
    return true;
  };
  const handleAddCategory = () => {
    if (!isCorrectAllFields()) return false;
    const payload = { ...cleanObjectValues(categoryDetails) };
    dispatch(addCategory({ userToken, payload }))
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
            message: messages.categoryAdded,
            type: "success",
          })
        );
        const category = res?.data?.carCategory;
        dispatch(setCategories([...categories, category]));
        clearForm()
      })
      .catch((error) => {
        return dispatch(
          showNotificationMessage({ message: error, type: "error" })
        );
      });
  };

  const handleEditCategory = () => {
    if (!isCorrectAllFields()) return false;
    const payload = { ...cleanObjectValues(categoryDetails) };
    dispatch(editCategory({ userToken, payload, id: categoryData?._id }))
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
            message: messages.editedCategoryMsg,
            type: "success",
          })
        );
        const category = res?.data?.category;
        let categoriesList = categories;
        categoriesList = categoriesList.map((x) => (x._id === category._id ? category : x));
        dispatch(setCategories([...categoriesList]));
      })
      .catch((error) => {
        return dispatch(
          showNotificationMessage({ message: error, type: "error" })
        );
      });
  };

  const handleCategoryDetailsChange = (item) => {
    setCategoryDetails({ ...categoryDetails, ...item });

    if (
      item.name &&
      errors.name &&
      item.name.length >= MIN_NAME_LENGTH &&
      item.name.length <= MAX_NAME_LENGTH
    ) {
      setErrors({ ...errors, name: "" });
    }
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
          sx={{ display: categoryData && "none" }}
          gutterBottom
        >
          Add car category details
        </Typography>
        <Divider
          style={{
            borderBottom: "1px solid #e5e5e5",
            display: categoryData && "none",
          }}
        />
        <Box sx={{ mt: 3, width: "50%" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="name"
                label="Category name"
                value={categoryDetails?.name}
                onChange={(e) => {
                  handleCategoryDetailsChange({ name: e.target.value });
                }}
                error={errors.name}
                helperText={errors.name}
                name="name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="description"
                label="Category description"
                value={categoryDetails?.description}
                onChange={(e) => {
                  handleCategoryDetailsChange({ description: e.target.value });
                }}
                name="description"
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => {
              if (!categoryData) handleAddCategory();
              else handleEditCategory();
            }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Grid>
  );
}
