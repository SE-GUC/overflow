const recombee = require("recombee-api-client");
const rqs = recombee.requests;
const vacanciesFunctions = require("../routes/api/vacancies");
const memberFunctions = require("../routes/api/members");

const client = new recombee.ApiClient(
  "lirtenhub",
  "OQ6Obb9equZ7V1WWQDQBxpKGzAOyD7BtNzeo3i7rHZnxzWF6htw0A8GTjytfRZFB"
);

const setVacanciesProperties = () => {
  client.send(
    new rqs.Batch([
      new rqs.AddItemProperty("description", "string"),
      new rqs.AddItemProperty("partnerID", "string"),
      new rqs.AddItemProperty("duration", "string"),
      new rqs.AddItemProperty("monthlyWage", "string"),
      new rqs.AddItemProperty("location", "string"),
      new rqs.AddItemProperty("dailyHours", "string"),
      new rqs.AddItemProperty("availablity", "string"),
      new rqs.AddItemProperty("skills", "set"),
      new rqs.AddItemProperty("startDate", "date"),
      new rqs.AddItemProperty("endDate", "endDate")
    ])
  );
};
const setMemberProperties = () => {
  client.send(
    new rqs.Batch([
      new rqs.DeleteItemProperty("age", "int"),
      new rqs.DeleteItemProperty("interests", "set")
    ])
  );
  client.send(
    new rqs.Batch([
      new rqs.AddUserProperty("skills", "set"),
      new rqs.AddUserProperty("location", "string"),
      new rqs.AddUserProperty("age", "int"),
      new rqs.AddUserProperty("interests", "set"),
      new rqs.AddUserProperty("availability", "string")
    ])
  );
};
const addMemberDetails = member => {
  const { skills, location, age, interests, availability } = member.userData;
  const memberID = member._id;
  const currentDate = new Date();
  client.send(
    new rqs.SetUserValues(
      memberID,
      {
        skills: skills,
        location: location,
        age: age,
        interests: interests,
        availability: availability
      },
      { timestamp: currentDate, cascadeCreate: true }
    )
  );
};

const addItemDetails = vacancy => {
  const {
    description,
    duration,
    monthlyWage,
    location,
    dailyHours,
    startDate,
    availability,
    skills,
    endDate
  } = vacancy;
  const partnerID = vacancy.partner._id;
  const currentDate = new Date();
  client.send(
    new rqs.SetItemValues(
      vacancy._id,
      {
        description: description,
        partnerID: partnerID,
        duration: duration,
        monthlyWage: monthlyWage,
        location: location,
        dailyHours: dailyHours,
        startDate: startDate,
        skills: skills,
        availability: availability,
        endDate: endDate
      },
      { timestamp: currentDate, cascadeCreate: true }
    )
  );
};
const addDetailView = (vacancyID, memberID) => {
  const currentDate = new Date();
  client.send(
    new rqs.AddDetailView(memberID, vacancyID, {
      timestamp: currentDate,
      cascadeCreate: true
    }),
    (err, response) => {}
  );
};
const getRecommendations = async (memberID, requiredNumber, fn) => {
  let recommendedItems = [];
  client
    .send(
      new rqs.RecommendItemsToUser(memberID, requiredNumber),
      (err, recommended) => {
        console.log(recommended, "In source");
        fn(recommended);
      }
    )
    .then(recommended => {
      return recommended;
    });

  //   console.log(recommendedItems, "Recommended");
};
module.exports = {
  addDetailView,
  addItemDetails,
  setVacanciesProperties,
  getRecommendations,
  addMemberDetails,
  setMemberProperties
};
