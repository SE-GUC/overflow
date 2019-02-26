const uuid = require('uuid');

export default class LifeCoach {
  constuctor(
    name,
    dateOfBirth,
    gender,
    joinDate,
    hourlyRate,
    salary,
    email,
    monthlySlots,
  ) {
    this.id = uuid.v4();
    this.name = name;
    this.dateOfBirth = dateOfBirth;
    this.gender = gender;
    this.hourlyRate = hourlyRate;
    this.joinDate = joinDate;
    this.salary = salary;
    this.email = email;
    this.monthlySlots = monthlySlots;
    this.age = new Date().getFullYear() - dateOfBirth.getFullYear();
  }
}
