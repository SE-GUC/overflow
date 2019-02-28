const uuid = require("uuid");

class User {
  constructor(type, data, password) {
    this.id = uuid.v4();
    this.type = type;
    this.data = data;
    this.password = password;
  }
}
module.exports = User;
