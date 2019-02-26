const uuid = require("uuid");

class Member {
  constuctor(
    name,
    dateOfBirth,
    gender,
    joinDate,
    email,
    skills,
    interests,
    reviews
  ) {
    this.id = uuid.v4();
    this.name = name;
    this.dateOfBirth = dateOfBirth;
    this.gender = gender;
    this.joinDate = joinDate;
    this.email = email;
    this.skills = skills;
    this.interests = interests;
    this.reviews = reviews;
    this.age = new Date().getFullYear() - dateOfBirth.getFullYear();
  }
}
module.exports = Member;
