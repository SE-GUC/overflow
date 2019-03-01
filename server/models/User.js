const uuid = require("uuid");

class User {
  constructor(type, userData, password) {
    this.id = uuid.v4();
    this.type = type;
    this.userData = userData;
    this.password = password;
  }
}
module.exports = User;
