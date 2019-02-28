class LifeCoach {
  constructor(
    name,
    dateOfBirth,
    gender,
    joinDate,
    hourlyRate,
    email,
    monthlySlots
  ) {
    this.name = name;
    this.dateOfBirth = dateOfBirth;
    this.gender = gender;
    this.hourlyRate = hourlyRate;
    this.joinDate = joinDate;
    this.email = email;
    this.monthlySlots = monthlySlots;
    this.age = new Date().getFullYear() - dateOfBirth.getFullYear();
  }
}

module.exports = LifeCoach;
