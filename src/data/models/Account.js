class Account {
  constructor(username = null, password = null, registrationDate = Date.now()) {
    this._id = undefined; // eslint-disable-line
    this.username = username;
    // TODO: In real life apps we will store hash and salt in db instead of user password
    this.password = password;
    this.registrationDate = registrationDate;
  }
}

module.exports = Account;
