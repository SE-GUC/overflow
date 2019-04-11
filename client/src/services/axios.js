import Axios from "axios";
const path = "https://lirten-hub-overflow.herokuapp.com/api/";

export const get = urlInput => {
  let url = path + urlInput;
  return Axios.get(url).then(response => {
    console.log(response);
    return response.data.data;
  });
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

export const put = (url, body) => {
  return Axios({
    method: "put",
    url: path + url,
    data: body,
    headers: { "Content-Type": "application/json" }
  });
};
