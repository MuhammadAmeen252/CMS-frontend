
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth"
import carReducer from "./slices/carSlice"
import carCategoryReducer from "./slices/carCategorySlice"
import snackbarReducer from "./slices/snackbarSlice"

const reducer = {
    auth: authReducer,
    cars: carReducer,
    categories: carCategoryReducer,
    snackbar: snackbarReducer
}
export default configureStore({
    reducer: reducer,
    devTools: true,
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})