import Axios from "axios";

const path = "http://localhost:3000/api/";
export const get = urlInput => {
  let result = [];
  let url = path + urlInput;
  return Axios.get(url)
    .catch(error => {
      console.log(error);
    })
    .then(function(response) {
      console.log(response);
      return response.data;
    });
};

const postData = (url = ``, data = {}) => {
  return Axios.post(url, data);
};
export const post = (urlInput, req) => {
  let url = path + urlInput;
  return postData(url, req);
};
