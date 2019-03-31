const firebase = require("firebase-admin");
const serviceAccount = require("./adminKey.json");
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://lirten-hub.firebaseio.com",
  messagingSenderId: "901639143723"
});

const registrationToken =
  "dZvQyb9ctwI:APA91bFfDaGHqku7_14szaB9Kwsvjp8RxBJX-eciUjHHjg_sCr-SLoYbA9sFx6Ne6FL35FmoPa1zO6N4ySaXOAOW_-6_9EY2EL1TLfqAIRtKhT1_Cl2t4cQgT_4zpkleiUGdywalbmU7";
const payload = {
  notification: {
    title: "firebase message",
    body: "First message being sent"
  }
};
const headers = {
  Authorization: "key=AIzaSyDO8PTNaRtp4qMynNDF54Q0fcHx0sIe-40",
  "Content-Type": "application/json"
};
const options = {
  uri: "https://fcm.googleapis.com/fcm/send",
  method: "POST",
  headers: headers
};

firebase
  .messaging()
  .sendToDevice(registrationToken, payload, options)
  .then(function(response) {
    console.log("Successfully sent message:", response);
  })
  .catch(function(error) {
    console.log("Error sending message:", error);
  });
