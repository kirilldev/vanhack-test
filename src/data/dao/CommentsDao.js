const MongoConf = require('../MongoConf.js');
const ObjectID = require('mongodb').ObjectID;

const getCollection = () =>
  MongoConf.getForumDatastore().then(db => db.collection('Comments'));

const CommentsDao = {};

CommentsDao.findByPostId = function (id) {
  return getCollection()
    .then(col => col.findOne({_id: ObjectID(id)}))
    .then(res => res || []);
};

CommentsDao.addOne = function (id, post) {
  const updateOperations = {
    $set: {},
  };

  updateOperations.$set[`comments.${Date.now()}`] = post;

  return getCollection()
    .then(col => col.updateOne({_id: ObjectID(id)}, updateOperations))
    .then(res => CommentsDao.findByPostId(id));
};

CommentsDao.createDefaults = function (id) {
  const obj = {
    _id: ObjectID(id),
    comments: {}
  };

  return getCollection()
    .then(col => col.insertOne(obj))
    .then(res => res.ops[0]);
};

module.exports = CommentsDao;
