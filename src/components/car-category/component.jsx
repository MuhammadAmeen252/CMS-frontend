import Styled from "./styles";
import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCategories,
  deleteCategory,
  setCategories,
} from "../../redux/slices/carCategorySlice";
import messages from "../../locales/en";
import Modal from "../common/modal/component";
import { useState } from "react";
import { showNotificationMessage } from "../../redux/slices/snackbarSlice";
import CarCategoryForm from "./categoryForm/component";
const CarCategory = (props) => {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.categories);
  const userToken = currentUser?.token;
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const columns = [
    { field: "name", headerName: "Name", width: 250 },
    {
      field: "description",
      headerName: "Description",
      width: 400,
      sortable: false,
      valueGetter: (params) => `${params.row.description || "-"}`,
    },
    {
      field: "Actions",
      headerName: "Actions",
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <IconButton
              color="primary"
              style={{
                borderRadius: "2px",
                height: 30,
                width: 30,
                color: "primary",
              }}
              onClick={() => handleOpenEditModal()}
            >
              <Edit />
            </IconButton>
            <IconButton
              style={{
                borderRadius: "2px",
                height: 30,
                width: 30,
                color: "red",
                marginLeft: 8,
              }}
              onClick={() => handleOpenDeleteModal()}
            >
              <Delete />
            </IconButton>
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    dispatch(getAllCategories(userToken));
  }, []);
  const handleCloseDeleteModal = () => {
    setIsOpenDeleteModal(false);
  };
  const handleOpenDeleteModal = () => {
    setIsOpenDeleteModal(true);
  };
  const handleCloseEditModal = () => {
    setIsOpenEditModal(false);
  };
  const handleOpenEditModal = () => {
    setIsOpenEditModal(true);
  };

  const getCategoryDetailsFromId = (id) => {
    const categoryDetails = categories.find((x) => x._id === id);
    return categoryDetails;
  };

  const deleteSelectedRow = () => {
    let categoriesList = categories;
    categoriesList = categoriesList.filter(
      (item) => item._id !== selectedCategoryId
    );
    dispatch(setCategories([...categoriesList]));
    handleCloseDeleteModal();
    dispatch(deleteCategory({ userToken, id: selectedCategoryId }))
      .unwrap()
      .then((res) => {
        if (!res) {
          return dispatch(
            showNotificationMessage({
              message: messages.invlidRes,
              type: "error",
            })
          );
        }
        dispatch(
          showNotificationMessage({
            message: "Deleted car category successfully.",
            type: "success",
          })
        );
      })
      .catch((error) => {
        return false;
      });
  };
  return (
    <Grid>
      <Box style={{ height: 430, width: "100%" }}>
        <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
          All Categories
        </Typography>
        <DataGrid
          rows={categories || []}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row?._id}
          checkboxSelection={false}
          isRowSelectable={false}
          disableMultipleSelection={false}
          onSelectionModelChange={(item) => setSelectedCategoryId(item[0])}
        />
      </Box>
      {isOpenDeleteModal && (
        <Modal
          isOpenModal={isOpenDeleteModal}
          handleCloseModalCallback={handleCloseDeleteModal}
          title={"Delete car category"}
          renderModalActions={() => {
            return (
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={deleteSelectedRow}
                >
                  Yes
                </Button>
                <Button
                  sx={{ ml: 1 }}
                  variant="outlined"
                  color="primary"
                  onClick={handleCloseDeleteModal}
                >
                  Cancel
                </Button>
              </div>
            );
          }}
        >
          <Typography>
            {" "}
            Are you sure you want to delete this car category?{" "}
          </Typography>
        </Modal>
      )}
      {isOpenEditModal && (
        <Modal
          isOpenModal={isOpenEditModal}
          handleCloseModalCallback={handleCloseEditModal}
          notViewModalActions={true}
          title={"Edit car category"}
        >
          <CarCategoryForm
            categoryData={getCategoryDetailsFromId(selectedCategoryId)}
          />
        </Modal>
      )}
    </Grid>
  );
};

export default CarCategory;
