import Styled from "./styles";
import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getAllCars, deleteCar, setCars } from "../../redux/slices/carSlice";
import messages from "../../locales/en";
import Modal from "../common/modal/component";
import { useState } from "react";
import { showNotificationMessage } from "../../redux/slices/snackbarSlice";
import CarForm from "./carForm/component";
const Cars = (props) => {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);
  const { cars } = useSelector((state) => state.cars);
  const userToken = currentUser?.token;
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [selectedCarId, setSelectedCarId] = useState(null);
  const columns = [
    { field: "company", headerName: "Company", width: 100 },
    { field: "name", headerName: "Name" },
    { field: "model", headerName: "Model" },
    {
      field: "registrationYear",
      headerName: "Reg Year",
    },
    {
      field: "registrationNumber",
      headerName: "Reg #",
      sortable: false,
    },
    {
      field: "engineNumber",
      headerName: "Engine #",
      sortable: false,
    },
    {
      field: "category",
      headerName: "Category",
    },
    {
      field: "topSpeed",
      headerName: "Top Speed",
      sortable: false,
      valueGetter: (params) => `${params.row.topSpeed || "-"}`,
    },
    {
      field: "color",
      headerName: "Color",
      renderCell: (params) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span
              style={{
                backgroundColor: params.value,
                borderRadius: "20px",
                border: "1px solid grey",
                height: 20,
                width: 20,
              }}
            >
              {" "}
            </span>
            <Typography variant="p" fontSize={11}>
              {params.value}
            </Typography>
          </div>
        );
      },
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
                marginLeft:8
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
    dispatch(getAllCars(userToken))
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

  const getCarDetailsFromId = (id) => {
    const carDetails = cars.find((x) => x._id === id);
    return carDetails;
  };

  const deleteSelectedRow = () => {
    let carsList = cars;
    carsList = carsList.filter((item) => item._id !== selectedCarId);
    dispatch(setCars([...carsList]));
    handleCloseDeleteModal();
    dispatch(deleteCar({ userToken, id: selectedCarId }))
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
            message: "Deleted car successfully.",
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
          All Cars
        </Typography>
        <DataGrid
          rows={cars || []}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row._id}
          checkboxSelection={false}
          isRowSelectable={false}
          disableMultipleSelection={false}
          onSelectionModelChange={(item) => setSelectedCarId(item[0])}
        />
      </Box>
      {isOpenDeleteModal && (
        <Modal
          isOpenModal={isOpenDeleteModal}
          handleCloseModalCallback={handleCloseDeleteModal}
          title={"Delete car"}
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
          <Typography> Are you sure you want to delete this car? </Typography>
        </Modal>
      )}
      {isOpenEditModal && (
        <Modal
          isOpenModal={isOpenEditModal}
          handleCloseModalCallback={handleCloseEditModal}
          notViewModalActions={true}
          title={"Edit car"}
        >
          <CarForm carData={getCarDetailsFromId(selectedCarId)} />
        </Modal>
      )}
    </Grid>
  );
};

export default Cars;
