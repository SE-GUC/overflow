const express = require("express");
const mongoose = require("mongoose");
// API Imports go here
const users = require("./routes/api/users");

const vacancies = require("./routes/api/vacancies");
const jobApplications = require("./routes/api/jobApplications");
const feedbacks = require("./routes/api/feedback");
const slots = require("./routes/api/slot");
const review = require("./routes/api/review");

const app = express();
// DB Config
const db = require("./config/keys").mongoURI;
const dbConfig = { useNewUrlParser: true };
mongoose
  .connect(db, dbConfig)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.send("<h1>Overflow Lirten Hub</h1>");
});
// API Routes go here
app.use("/api/users", users);

app.use("/api/vacancies", vacancies);
app.use("/api/jobApplications", jobApplications);
app.use("/api/feedback", feedbacks);
app.use("/api/slots", slots);
app.use("/api/reviews", review);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server up and running on port ${port}`));
