import Axios from "axios";

const path = "https://lirten-hub-overflow.herokuapp.com/api/";
export const get = urlInput => {
  let result = [];
  let url = path + urlInput;
  return Axios.get(url)
    .then(response => {
      console.log(response);
      return response.data.data;
    })
    .catch(error => console.log(error));
};

const postData = (url = ``, data = {}) => {
  // Default options are marked with *
  return Axios.post(url, data)
    .then(response => console.log(response))
    .catch(error => console.log(error));
};
export const post = (urlInput, req) => {
  let url = path + urlInput;
  return postData(url, req);
};
