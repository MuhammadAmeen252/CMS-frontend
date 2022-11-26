import styled from "@mui/system/styled";
import { Box } from "@mui/material";

const MainLayoutContainer = styled(Box)(({ theme }) =>({
  paddingLeft: theme.screenPadding,
  paddingRight: theme.screenPadding,
  maxHeight: window.screen.availHeight-200 
}));

export default {
    MainLayoutContainer
}