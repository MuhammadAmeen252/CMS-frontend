import Styled from "./styles";
import React, { useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import { CategoryOutlined, NoCrash, SupervisedUserCircle } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { veiwDashboard } from "../../redux/slices/carSlice";
import messages from "../../locales/en";
import { useState } from "react";
import Cars from "../cars/component";
import { showNotificationMessage } from "../../redux/slices/snackbarSlice";
const Dashboard = (props) => {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);
  const userToken = currentUser?.token
  const [stats, setStats] = useState(null);
  useEffect(() => {
    dispatch(veiwDashboard(userToken))
      .unwrap()
      .then((res) => {
        if (!res) {
          return dispatch(showNotificationMessage({message: messages.invlidRes, type: "error"}));
        }
        setStats(res)
      })
      .catch((error) => {
        dispatch(showNotificationMessage({message: messages.invlidRes, type: "error"}));
      });
  }, []);

  return (
    <Grid>
      <Grid container sx={{ justifyContent: "space-between", mb:2 }}>
        <Styled.CountBox item xs={10} md={2.5}>
          <Styled.CountBoxContent>
            <Box flex={"column"}>
              <Typography variant="p" fontSize={11}>
                TOTAL CARS
              </Typography>
              <Typography>{stats?.carsCount}</Typography>
            </Box>
            <Box mt={1}>
              <AirportShuttleIcon fontSize="large" />
            </Box>
          </Styled.CountBoxContent>
        </Styled.CountBox>
        <Styled.CountBox item xs={10} md={2.5}>
          <Styled.CountBoxContent>
            <Box flex={"column"}>
              <Typography variant="p" fontSize={11}>
                TOTAL CATEGORIES
              </Typography>
              <Typography>{stats?.carsCategoriesCount}</Typography>
            </Box>
            <Box mt={1}>
              <CategoryOutlined fontSize="large" />
            </Box>
          </Styled.CountBoxContent>
        </Styled.CountBox>
        <Styled.CountBox item xs={10} md={2.5}>
          <Styled.CountBoxContent>
            <Box flex={"column"}>
              <Typography variant="p" fontSize={11}>
                CARS ADDED TODAY
              </Typography>
              <Typography>{stats?.todayAddedCarsCount}</Typography>
            </Box>
            <Box mt={1}>
              <NoCrash fontSize="large" />
            </Box>
          </Styled.CountBoxContent>
        </Styled.CountBox>
        <Styled.CountBox item xs={10} md={2.5}>
          <Styled.CountBoxContent>
            <Box flex={"column"}>
              <Typography variant="p" fontSize={11}>
                TOTAL USERS
              </Typography>
              <Typography>{stats?.usersCount}</Typography>
            </Box>
            <Box mt={1}>
              <SupervisedUserCircle fontSize="large" />
            </Box>
          </Styled.CountBoxContent>
        </Styled.CountBox>
      </Grid>
      <Cars />
    </Grid>
  );
};

export default Dashboard;
