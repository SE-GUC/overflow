const express = require("express");
const Joi = require("joi");
const router = express.Router();
const firebase = require("firebase-admin");
const serviceAccount = require("../../services/adminKey.json");
const axios = require("axios");
const Subscribers = require("../../models/Subscriber");
const User = require("../../models/User");
//firebase setup
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://lirten-hub.firebaseio.com",
  messagingSenderId: "901639143723"
});

const headers = {
  Authorization:
    "key=AAAA0e3hgSs:APA91bFAqwc8OQhwizey4JrGDK1m8GglYmKtsw6GsH5aMbD5RZEsB3PEp6wwKZA8YlYyInFLz44st8Wfaccpd_sBTgFJwkn82GmaILEKbsw3620DbpN4aUfb9CDDMIE07-Bo0eURQC5F",
  "Content-Type": "application/json"
};

//send function accepts a list of userIds and notification data
//notification data includes body and title,link,actionTitle,optional Emoji
router.post("/send", async (req, res) => {
  try {
    const { userIds, data } = req.body;
    const subscribers = await Subscribers.find({ userId: { $in: userIds } });
    const registration_ids = subscribers.map(subscriber => subscriber.token);
    const sent = await axios({
      method: "post",
      url: "https://fcm.googleapis.com/fcm/send",
      data: {
        registration_ids,
        data,
      },
      headers
    });
    return res.json({ data: sent });
  } catch (error) {
    console.log(error);
    return res.sendStatus(200);
  }
});

router.get("/", async (req, res) => {
  const subscribers = await Subscribers.find();
  return res.json({ data: subscribers });
});
router.post("/add", async (req, res) => {
  const schema = {
    userId: Joi.string().required(),
    token: Joi.string().required()
  };
  const result = Joi.validate(req.body, schema);
  const { userId, token } = req.body;
  if (result.error)
    return res.status(400).send({ error: result.error.details[0].message });
  try {
    const subscriber = await Subscribers.create({
      userId,
      token
    });
    return res.json({ data: subscriber });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});
module.exports = router;
