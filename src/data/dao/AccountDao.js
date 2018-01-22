const MongoConf = require('../MongoConf.js');
const ObjectID = require('mongodb').ObjectID;
const Account = require('../models/Account.js');

const getCollection = () =>
  MongoConf.getForumDatastore().then(db => db.collection('Account'));

const castToType = dbObject =>
  dbObject ? Object.assign(new Account(), dbObject) : null;

const AccountDao = {};

AccountDao.save = function save(account) {
  return getCollection()
    .then(col => col.insertOne(account))
    .then(res => castToType(res.ops[0]));
};

AccountDao.findById = function (id) {
  console.log(id);
  return getCollection()
    .then(col => col.findOne({_id: ObjectID(id)}))
      .then(res => castToType(res));
};

AccountDao.getByUsername = function get(username) {
  const projection = {
    username,
  };

  return getCollection()
    .then(col => col.findOne(projection))
    .then(castToType);
};

module.exports = AccountDao;
