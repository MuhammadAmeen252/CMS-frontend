import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CarService from "../../api/car/index";
import { handleUserNotAuthorized } from "../service";

const initialState = {
  cars: [],
};

export const getAllCars = createAsyncThunk(
  "cars/view",
  async (userToken, thunkApi) => {
    try {
      const response = await CarService.getAllCars(userToken);
      const cars = response?.data?.data?.cars;
      return cars;
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

export const veiwDashboard = createAsyncThunk(
  "dashboard/view",
  async (userToken, thunkApi) => {
    try {
      const response = await CarService.getDashboardData(userToken);
      return response?.data?.data;
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

export const addCar = createAsyncThunk(
  "car/add",
  async ({ userToken, payload }, thunkApi) => {
    try {
      const response = await CarService.addCar(payload, userToken);
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

export const deleteCar = createAsyncThunk(
  "car/delete",
  async ({ userToken, id }, thunkApi) => {
    try {
      const response = await CarService.deleteCar(id, userToken);
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

export const editCar = createAsyncThunk(
  "car/edit",
  async ({ userToken, payload, id }, thunkApi) => {
    try {
      const response = await CarService.updateCar(payload,id,userToken);
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

const carsSlice = createSlice({
  name: "car",
  initialState,
  reducers: {
    setCars: (state, action) => {
      state.cars = action.payload
    },
  },
  extraReducers: {
    [getAllCars.fulfilled]: (state, action) => {
        state.cars = action.payload
    },
  },
});

export const { setCars } = carsSlice.actions;
const { reducer } = carsSlice;
export default reducer;
