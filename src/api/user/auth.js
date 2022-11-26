import api from "../index";

function registerUser(userCredentails) {
  try {
    const payload = userCredentails;
    return api.post(`/user/register`, payload);
  } catch (e) {
    return e;
  }
}

function loginUser(userCredentails) {
  try {
    const payload = userCredentails;
    return api.post(`/user/login`, payload);
  } catch (e) {
    return e;
  }
}

function logoutUser() {
  try {
    localStorage.removeItem("user")
  } catch (e) {
    return e;
  }
}
const AuthService = { registerUser, loginUser, logoutUser };
export default AuthService;
