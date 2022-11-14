import styled from "@mui/system/styled";
import { AppBar } from "@mui/material";

const MyAppBar = styled(AppBar)(({ theme }) =>({
  paddingLeft: theme.screenPadding,
  paddingRight: theme.screenPadding,
}));

const customStyling = {
    logoName:{
        mr: 2,
        display: { xs: 'none', md: 'flex' },
        fontFamily: 'monospace',
        fontWeight: 700,
        letterSpacing: '.3rem',
        color: 'inherit',
        textDecoration: 'none', 
    },
    logoNameMobile:{
        mr: 2,
        display: { xs: 'flex', md: 'none' },
        flexGrow: 1,
        fontFamily: 'monospace',
        fontWeight: 700,
        letterSpacing: '.3rem',
        color: 'inherit',
        textDecoration: 'none',
    }
}
export default {
  MyAppBar,
  customStyling
};
