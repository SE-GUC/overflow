const uuid = require('uuid');

class Admin {
  constuctor(name, dateOfBirth, gender, joinDate, salary, email, isSuper) {
    this.id = uuid.v4();
    this.name = name;
    this.dateOfBirth = dateOfBirth;
    this.gender = gender;
    this.joinDate = joinDate;
    this.salary = salary;
    this.email = email;
    this.isSuper = isSuper;
    this.age = new Date().getFullYear() - dateOfBirth.getFullYear();
  }
}
module.exports = Admin;
