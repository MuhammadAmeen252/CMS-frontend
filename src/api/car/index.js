import api from "../index";

function getDashboardData(userToken) {
  try {
    const headers = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    return api.get(`/`, headers);
  } catch (e) {
    return e;
  }
}

function getAllCars(userToken) {
  try {
    const headers = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    return api.get(`/cars`, headers);
  } catch (e) {
    return e;
  }
}

function addCar(payload, userToken) {
  try {
    const headers = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    return api.post(`/car`, payload, headers);
  } catch (e) {
    return e;
  }
}

function updateCar(payload, id, userToken) {
  try {
    const headers = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    return api.patch(`/car/${id}`, payload, headers);
  } catch (e) {
    return e;
  }
}
function deleteCar(id, userToken) {
  try {
    const headers = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    return api.delete(`/car/${id}`, headers);
  } catch (e) {
    return e;
  }
}
function getCar(id, userToken) {
  try {
    const headers = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    return api.get(`/car/${id}`, headers);
  } catch (e) {
    return e;
  }
}
const CarService = {
  getAllCars,
  getDashboardData,
  addCar,
  updateCar,
  deleteCar,
  getCar,
};
export default CarService;
