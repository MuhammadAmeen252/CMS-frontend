import axios from "axios";
import {getBaseUrlOfBrowser, BASE_API_PATH_PARAMS} from "./service"

export default axios.create({
	baseURL: getBaseUrlOfBrowser() + BASE_API_PATH_PARAMS,
	// withCredentials: false,
	// headers: {
	//   'Access-Control-Allow-Origin' : true,
	//   'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
	//   'Accept':'*/*'
	//   }
});