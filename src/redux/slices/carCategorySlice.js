import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CarCategoryService from "../../api/categories/index";
import { handleUserNotAuthorized } from "../service";

const initialState = {
  categories: [],
};

export const getAllCategories = createAsyncThunk(
  "categories/view",
  async (userToken, thunkApi) => {
    try {
      const response = await CarCategoryService.getAllCategories(userToken);
      const categories = response?.data?.data?.categories;
      return categories;
    } catch (error) {
      let message =
        (error.response &&
          error.response.data &&
          error.response.data.error &&
          error.response.data.error.message) ||
        error.message.toString() ||
        error.toString();
      if (error?.response?.status === 401) {
        handleUserNotAuthorized();
      }
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const addCategory = createAsyncThunk(
  "carCategory/add",
  async ({ userToken, payload }, thunkApi) => {
    try {
      const response = await CarCategoryService.addCategory(payload, userToken);
      return response.data;
    } catch (error) {
      let message =
        (error.response &&
          error.response.data &&
          error.response.data.error &&
          error.response.data.error.message) ||
        error.message ||
        error.toString();
      if (error?.response?.status === 401) {
        handleUserNotAuthorized();
      }
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "carCategory/delete",
  async ({ userToken, id }, thunkApi) => {
    try {
      const response = await CarCategoryService.deleteCategory(id, userToken);
      return response.data;
    } catch (error) {
      let message =
        (error.response &&
          error.response.data &&
          error.response.data.error &&
          error.response.data.error.message) ||
        error.message ||
        error.toString();
      if (error?.response?.status === 401) {
        handleUserNotAuthorized();
      }
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const editCategory = createAsyncThunk(
  "carCategory/edit",
  async ({ userToken, payload, id }, thunkApi) => {
    try {
      const response = await CarCategoryService.updateCategory(
        payload,
        id,
        userToken
      );
      return response.data;
    } catch (error) {
      let message =
        (error.response &&
          error.response.data &&
          error.response.data.error &&
          error.response.data.error.message) ||
        error.message ||
        error.toString();
      if (error?.response?.status === 401) {
        handleUserNotAuthorized();
      }
      return thunkApi.rejectWithValue(message);
    }
  }
);

const carCategoriesSlice = createSlice({
  name: "carCategories",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
  extraReducers: {
    [getAllCategories.fulfilled]: (state, action) => {
        state.categories = action.payload
    },
  },
});

export const { setCategories } = carCategoriesSlice.actions;
const { reducer } = carCategoriesSlice;
export default reducer;
