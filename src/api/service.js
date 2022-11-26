const BASE_URL_DEV = "http://localhost:8080";
const BASE_API_PATH_PARAMS = `/api`;
const BASE_URL_CLIENT = window.location.origin;

const getBaseUrlOfBrowser = () => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    return BASE_URL_DEV;
  } else {
    return BASE_URL_CLIENT;
  }
};

export {
  BASE_URL_DEV,
  BASE_URL_CLIENT,
  BASE_API_PATH_PARAMS,
  getBaseUrlOfBrowser,
};
