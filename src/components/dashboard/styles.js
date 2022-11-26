import styled from "@mui/system/styled";
import { Box, Grid } from "@mui/material";

const CountBox = styled(Grid)(({ theme }) => ({
  height: 80,
  backgroundColor: "silver",
  display: "flex",
  textAlign: "center",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
  borderRadius: 7,
}));

const CountBoxContent = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  paddingLeft: 20,
  paddingRight: 20,
  width:"100%"
}));

export default {
  CountBox,
  CountBoxContent,
};
