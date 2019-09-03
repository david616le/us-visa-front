//import AuthStore from './stores/AuthStore'
import axios from "axios";

const apiUrl = "http://localhost:4040/api/";

const handleErrors = err => {
  throw err;
};
const responseData = res => res;

const requests = {
  get: (url, headers) =>
    axios({ url: `${apiUrl}${url}`, method: "get", headers })
      .then(responseData)
      .catch(handleErrors),
  post: (url, headers, data) =>
    axios({ url: `${apiUrl}${url}`, method: "post", headers, data })
      .then(responseData)
      .catch(handleErrors),
  //   getAddress: data =>
  //     axios
  //       .get(`${addressApiUrl}${data}?api-key=${addressApiKey}&expand=true`)
  //       .then(responseData)
  //       .catch(handleErrors),
  put: (url, data) =>
    axios
      .put(`${apiUrl}${url}`, data)
      .then(responseData)
      .catch(handleErrors),
  patch: (url, data) =>
    axios
      .patch(`${apiUrl}${url}`, data)
      .then(responseData)
      .catch(handleErrors),
  del: url =>
    axios
      .delete(`${apiUrl}${url}`)
      .then(responseData)
      .catch(handleErrors)
};

export const ApiManager = {
  SaveDS160Application: (headers, data) => requests.post(`ds-160`, headers, data),
  GetDS160Application: (headers, applicationId) => requests.get(`ds-160/${applicationId}`, headers),
};