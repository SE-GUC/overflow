import Axios from "axios";

const path = "http://overflow-se.herokuapp.com/api/";
export const get = urlInput => {
  let result = [];
  let url = path + urlInput;
  return Axios.get(url)
    .catch(error => {
      console.log(error);
    })
    .then(function(response) {
      console.log(response)
      return response.data;
    });
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

