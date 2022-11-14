import styled from "@mui/system/styled";
import { Grid } from "@mui/material";

const MainContainer = styled(Grid)(({ theme }) => ({
  paddingLeft: theme.screenPadding,
  paddingRight: theme.screenPadding,
}));

export default {
  MainContainer,
};
