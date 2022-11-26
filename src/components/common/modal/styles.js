import styled from "@mui/system/styled";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const ModalHeader = styled(Box)({
    padding: 8,
    paddingRight: 12,
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 3px 29px 0px",
    paddingLeft: 25,
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  });
  
  const ModalActions = styled(Box)({
    padding: 5,
    paddingTop: 15,
    paddingBottom: 15,
    borderTop: "0.5px solid #e5e5e5",
    display: "flex",
    justifyContent: "center",
  });
  
  const ModalTextField = styled(TextField)(({ theme }) => ({
    borderRadius: 3,
    ".MuiOutlinedInput-input": {
      padding: 7,
    },
    width: "100%",
    [theme.breakpoints.down("md")]: {},
  }));
  
  const ModalBox = styled(Box)(({ theme }) => ({
    width: "30%",
    [theme.breakpoints.down("lg")]: {
      width: "60%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "95%",
    },
  }));
  
  const ModalContentBox = styled(Box)({
    marginTop: 30,
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 30,
    overflow:'auto',
    maxHeight:'73vh'
  });

  const customStyling = {
    exportModal: {
      position: "absolute",
      top: { xs: "45%", sm: "50%" },
      left: "50%",
      transform: "translate(-50%, -50%)",
      bgcolor: "background.paper",
      borderRadius: 2,
      boxShadow: 24,
      overflowY: "hidden",
      maxHeight: "90%",
      border: "none",
    },
  };

  export default {
    ModalHeader,
    ModalActions,
    ModalTextField,
    ModalBox,
    ModalContentBox,
    customStyling,
  };