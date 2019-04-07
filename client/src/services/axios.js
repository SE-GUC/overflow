import Axios from "axios";
import qs from 'qs'
const path = "http://localhost:3000/api/";

<<<<<<< HEAD
=======
const path = "http://localhost:3000/api/";
>>>>>>> react_dev
export const get = urlInput => {
  let result = [];
  let url = path + urlInput;
  return Axios.get(url)
    .then(response => {
      console.log(response);
      return response.data.data;
    })
<<<<<<< HEAD
    .catch(error => console.log(error));
};

const postData = (url = ``, data = {}) => {
  // Default options are marked with *
  console.log(data,"AXIOSS")
  return Axios({
    method: "post",
    url: url,
    data: data,
    headers: { "Content-Type": "application/json" }
  })
//   return fetch(url, {
//     method: "POST", // *GET, POST, PUT, DELETE, etc.
//     mode: "cors", // no-cors, cors, *same-origin
//     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: "same-origin", // include, *same-origin, omit
//     headers: {
//         "Content-Type": "application/json; charset=utf-8",
//         // "Content-Type": "application/x-www-form-urlencoded",
//     },
//     redirect: "follow", // manual, *follow, error
//     referrer: "no-referrer", // no-referrer, *client
//     body: JSON.stringify(data), // body data type must match "Content-Type" header
// })
// .then(response => response.json());
  // return Axios.post(url, qs.stringify({...data}))
  //   .then(response => console.log(response))
  //   .catch(error => console.log(error));
=======
    .then(function(response) {
      console.log(response);
      return response.data;
    });
};

const postData = (url = ``, data = {}) => {
  return Axios.post(url, data);
>>>>>>> react_dev
};
export const post = (urlInput, req) => {
  let url = path + urlInput;
  return postData(url, req);
};
