import React, { useState, useRef, Component } from "react";
import Dashboard from "../dashboard/component";
import { Routes as SwitchRouter, Route } from "react-router-dom";
import { withRouter } from "./service";
import Drawer from "../drawer/component";
import { Box } from "@mui/material";
import Toolbar from '@mui/material/Toolbar';
import Styled from "./styles";
const Layout = () => {
  const drawerWidth = 240;
  return (
    <div>
      {/* PAGES CoNTENT HERE*/}
      <Styled.MainLayoutContainer>
        <Drawer />
        <Box component="main" sx={{ ml:29,mt:3 }} >
            <Toolbar />
          <SwitchRouter>
            <Route path="/" exact element={<Dashboard />} />
            <Route path="/dashboard" exact element={<Dashboard />} />
          </SwitchRouter>
        </Box>
      </Styled.MainLayoutContainer>

      {/* FOOTER HERE */}
    </div>
  );
};

export default withRouter(Layout);
