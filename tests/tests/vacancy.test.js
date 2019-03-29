const functions = require("../functions/vacancy.functions");
const userFunctions = require("../functions/user.functions");
const partnerFunctions = require("../functions/partner.functions");

test(
  "Get all vacancies",
  async () => {
    expect.assertions(1);
    const vacancies = await functions.getVacancies();
    if (vacancies.data.data.length > 0)
      expect(vacancies.data.data).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            //You should only put properties that are required in your schema
            _id: expect.any(String),
            description: expect.any(String),
            partner: expect.any(Object)
          })
        ])
      );
    else expect(vacancies.data.data).toEqual([]);
  },
  50000
);

test(
  "Get all vacancies of a partner",
  async () => {
    expect.assertions(1);
  },
  50000
);

test(
  "Get a single vacancy",
  async () => {
    expect.assertions(1);
    const vacancies = await functions.getVacancies();
    if (vacancies.data.data.length > 0) {
      const vacancy = await functions.getVacancy(vacancies.data.data[0]._id);
      expect(vacancy.data.data).toEqual(vacancies.data.data[0]);
    } else expect(vacancies.data.data).toEqual([]);
  },
  50000
);

test(
  "Get a non existent vacancy",
  async () => {
    expect.assertions(1);
    const vacancy = await functions.getVacancy("1234").catch(error => {
      expect(error.response.status).toEqual(400);
    });
  },
  50000
);

test(
  "Delete a vacancy",
  async () => {
    expect.assertions(1);
    const vacancies = await functions.getVacancies();
    if (vacancies.data.data.length > 0) {
      await functions.deleteVacancy(vacancies.data.data[0]._id);
      const vacanciesDeleted = await functions.getVacancies();
      expect(vacanciesDeleted.data.data).not.toEqual(
        expect.arrayContaining([
          expect.objectContaining(vacancies.data.data[0])
        ])
      );
    } else expect(vacancies.data.data).toEqual([]);
  },
  50000
);

test(
  "Delete a non existent vacancy",
  async () => {
    expect.assertions(1);
    await functions.deleteVacancy("1234").catch(error => {
      expect(error.response.status).toEqual(400);
    });
  },
  50000
);
