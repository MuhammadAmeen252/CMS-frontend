import styled from "@mui/system/styled";
import { Box } from "@mui/material";

const MainLayoutContainer = styled(Box)(({ theme }) =>({
  paddingLeft: theme.screenPadding,
  paddingRight: theme.screenPadding,
}));

export default {
    MainLayoutContainer
}