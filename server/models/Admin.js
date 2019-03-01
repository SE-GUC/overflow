class Admin {
  constructor(name, dateOfBirth, gender, joinDate, salary, email, isSuper) {
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
