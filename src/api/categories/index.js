import api from "../index";

function getAllCategories(userToken) {
  try {
    const headers = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    return api.get(`/car/categories/view`, headers);
  } catch (e) {
    return e;
  }
}

function addCategory(payload, userToken) {
  try {
    const headers = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    return api.post(`/car/category`, payload, headers);
  } catch (e) {
    return e;
  }
}

function updateCategory(payload, id, userToken) {
  try {
    const headers = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    return api.patch(`/car/category/${id}`, payload, headers);
  } catch (e) {
    return e;
  }
}
function deleteCategory(id, userToken) {
  try {
    const headers = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    return api.delete(`/car/category/${id}`, headers);
  } catch (e) {
    return e;
  }
}
function getCategory(id, userToken) {
  try {
    const headers = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    return api.get(`/car/category/${id}`, headers);
  } catch (e) {
    return e;
  }
}

const CarCategoryService = {
  getAllCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  getCategory,
};
export default CarCategoryService;
