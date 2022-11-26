import React from "react";
import Dashboard from "../dashboard/component";
import { Routes as SwitchRouter, Route } from "react-router-dom";
import { withRouter } from "./service";
import Drawer from "../drawer/component";
import { Paper } from "@mui/material";
import Styled from "./styles";
import Cars from "../cars/component";
import CarForm from "../cars/carForm/component";
import CarCategories from "../car-category/component";
import CarCategoryForm from "../car-category/categoryForm/component";
const Layout = (props) => {
  return (
    <div>
      {/* PAGES CoNTENT HERE*/}
      <Styled.MainLayoutContainer>
        <Drawer />
        <Paper elevation={3} sx={{ ml: 29, mt: 10, p: 3, pb: 10 }}>
          <SwitchRouter>
            <Route path="/" exact element={<Dashboard />} />
            <Route path="/viewCars" exact element={<Cars />} />
            <Route path="/addCar" exact element={<CarForm />} />
            <Route path="/viewCarCategories" exact element={<CarCategories />} />
            <Route path="/addCarCategory" exact element={<CarCategoryForm />} />
          </SwitchRouter>
        </Paper>
      </Styled.MainLayoutContainer>

      {/* FOOTER HERE */}
    </div>
  );
};

export default withRouter(Layout);
