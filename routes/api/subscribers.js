const express = require("express");
const Joi = require("joi");
const router = express.Router();
const firebase = require("firebase-admin");
const serviceAccount = require("../../services/adminKey.json");
const axios = require("axios");
const Subscribers = require("../../models/Subscriber");
const User = require("../../models/User");
const Notifications = require("../../models/Notifications");
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
    const { userIds, data, emoji } = req.body;
    const subscribers = await Subscribers.find({ userId: { $in: userIds } });
    const registration_ids = subscribers.map(subscriber => subscriber.token);
    data.userIds = userIds;
    data.date = new Date().toString();
    if (emoji) data.emoji = emoji;
    userIds.forEach(async userId => {
      await Notifications.create({
        userId,
        data
      });
    });
    const sent = await axios({
      method: "post",
      url: "https://fcm.googleapis.com/fcm/send",
      data: {
        registration_ids,
        data,
        time_to_live: 2419200
      },
      headers
    });
    return res.json({ data: sent });
  } catch (error) {
    console.log(error);
    return res.sendStatus(200);
  }
});
router.post("/sendAllAdmins", async (req, res) => {
  try {
    const { data } = req.body;
    const admins = await User.find({ type: "admin" });
    const adminIds = admins.map(admin => admin._id);
    const subscribers = await Subscribers.find({ userId: { $in: adminIds } });
    const registration_ids = subscribers.map(subscriber => subscriber.token);
    data.date = new Date().toString();
    adminIds.forEach(async userId => {
      await Notifications.create({
        userId,
        data
      });
    });
    const sent = await axios({
      method: "post",
      url: "https://fcm.googleapis.com/fcm/send",
      data: {
        registration_ids,
        data,
        time_to_live: 2419200
      },
      headers
    });
    return res.json({ data: sent });
  } catch (error) {
    console.log(error);
    return res.sendStatus(200);
  }
});
router.delete("/delete/:userId/:token", async (req, res) => {
  const { userId, token } = req.params;
  await Subscribers.deleteMany({ userId, token });
  return res.sendStatus(200);
});
router.delete("/deleteAll", async (req, res) => {
  await Subscribers.deleteMany({});
  return res.sendStatus(200);
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
    const subscriberCheck = await Subscribers.find({ userId, token });
    console.log(subscriberCheck);
    if (subscriberCheck.length > 0)
      return res.json({ msg: "token already exists" });
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
