import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Styled from "./styles";

const CommonModal = (props) => {
  const {
    isOpenModal,
    handleCloseModalCallback,
    title,
    renderModalActions,
    children,
    notViewModalActions,
  } = props;
  const [isOpen, setIsopen] = useState(isOpenModal);
  const closeModal = () => {
    handleCloseModalCallback();
  };
  return (
    <Modal
      open={isOpen}
      onClose={() => closeModal()}
      aria-labelledby="common-modal"
      aria-describedby="common-modal-description"
    >
      <Styled.ModalBox sx={Styled.customStyling.exportModal}>
        <Styled.ModalHeader sx={{ display: !title && "none" }}>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography
              id="common-modal-title"
              variant="h5"
              component="h5"
              style={{ fontWeight: "bold", marginLeft: 5 }}
            >
              {title ? title : ""}
            </Typography>
          </Box>
          <IconButton
            aria-label="closeWarningParagraphModal"
            onClick={() => closeModal()}
          >
            <CloseIcon color="seondary.light" />
          </IconButton>
        </Styled.ModalHeader>
        <Styled.ModalContentBox>{children}</Styled.ModalContentBox>
        <Styled.ModalActions sx={{ display: notViewModalActions && "none" }}>
          {!notViewModalActions && renderModalActions()}
        </Styled.ModalActions>
      </Styled.ModalBox>
    </Modal>
  );
};

export default CommonModal;
