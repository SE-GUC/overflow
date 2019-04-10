import Axios from "axios";
const path = "http://localhost:3000/api/";

export const get = urlInput => {
  let url = path + urlInput;
  return Axios.get(url)
    .then(response => {
      console.log(response);
      return response.data.data;
    })
    .catch(error => console.log(error));
};

const postData = (url = ``, data = {}) => {
  return Axios({
    method: "post",
    url: url,
    data: data,
    headers: { "Content-Type": "application/json" }
  });
};
export const post = (urlInput, req) => {
  let url = path + urlInput;
  return postData(url, req);
};
